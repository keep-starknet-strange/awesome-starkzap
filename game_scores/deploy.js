// deploy.js — GameScores contract deployment via starknet.js
// Usage: node deploy.js
//
// This script handles the full flow:
//   1. Check if deployer account is on-chain. If not, computes the address and
//      asks you to fund it from the Sepolia faucet first.
//   2. Deploys the account (if not yet deployed).
//   3. Declares the GameScores contract class.
//   4. Deploys the GameScores contract instance.
//   5. Runs a smoke test and saves deployment.json / updates .env.

import {
    RpcProvider,
    Account,
    Contract,
    json,
    stark,
    hash,
    CallData,
    constants,
    ec,
    num,
} from "starknet";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── CONFIG ───────────────────────────────────────────────────────────────────
// Public Sepolia RPC endpoints — ordered by preference
const RPC_ENDPOINTS = [
    "https://api.cartridge.gg/x/starknet/sepolia",
    "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7",
    "https://rpc.starknet-testnet.lava.build",
];

// OZ v0.9 account class hash (pre-declared on Sepolia)
const OZ_ACCOUNT_CLASS_HASH = "0x061dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f";

const PRIVATE_KEY = "0x077d8b74712216864d5b9fd6f3c256ea0fdd91a7c24103e9e2946b44a7ef4897";
const ACCOUNT_ADDRESS = "0x03f4e9745e2e8b6b0f11b6cbd27d497ffc43fd6bb491e6760c529b56b1218fed";

// ETH token contract on Sepolia
const ETH_TOKEN = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

// ── LOAD COMPILED ARTIFACTS ──────────────────────────────────────────────────
const sierraPath = path.join(__dirname, "target/dev/game_scores_GameScores.contract_class.json");
const casmPath = path.join(__dirname, "target/dev/game_scores_GameScores.compiled_contract_class.json");

if (!fs.existsSync(sierraPath) || !fs.existsSync(casmPath)) {
    console.error("❌ Compiled artifacts not found. Run `scarb build` first.");
    process.exit(1);
}

const sierra = json.parse(fs.readFileSync(sierraPath).toString());
const casm = json.parse(fs.readFileSync(casmPath).toString());

// ── HELPERS ──────────────────────────────────────────────────────────────────
async function createProvider() {
    for (const url of RPC_ENDPOINTS) {
        try {
            const provider = new RpcProvider({ nodeUrl: url, blockIdentifier: "latest" });
            const specVersion = await provider.getSpecVersion();
            console.log(`✅ RPC: ${url} (spec ${specVersion})`);
            return provider;
        } catch (e) {
            console.warn(`⚠️  ${url}: ${e.message?.split("\n")[0]}`);
        }
    }
    throw new Error("❌ No working RPC endpoint. Add your own to RPC_ENDPOINTS.");
}

async function isAccountDeployed(provider, address) {
    try {
        // If getNonce works, the account is deployed
        await provider.getNonceForAddress(address);
        return true;
    } catch (e) {
        // Error code 20 = Contract not found = not deployed
        if (e.message?.includes("Contract not found") || e.code === 20) return false;
        throw e;
    }
}

async function getEthBalance(provider, address) {
    try {
        // ERC20 balanceOf selector
        const result = await provider.callContract({
            contractAddress: ETH_TOKEN,
            entrypoint: "balanceOf",
            calldata: [address],
        });
        return BigInt(result[0] ?? 0);
    } catch {
        return null;
    }
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
    console.log("\n🚀 GameScores — Starknet.js Deployment\n");

    // 1. Connect to network
    const provider = await createProvider();
    console.log();

    // 2. Check if deployer account is on-chain
    const deployed = await isAccountDeployed(provider, ACCOUNT_ADDRESS);

    if (!deployed) {
        // Show the address and faucet link
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("⚠️  DEPLOYER ACCOUNT IS NOT YET DEPLOYED ON-CHAIN");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`\n📍 Account address:\n   ${ACCOUNT_ADDRESS}\n`);

        // Check if it has ETH
        const balance = await getEthBalance(provider, ACCOUNT_ADDRESS);
        if (balance !== null) {
            const ethStr = (Number(balance) / 1e18).toFixed(6);
            console.log(`💰 ETH balance: ${ethStr} ETH`);
            if (balance === 0n) {
                console.log("\n❌ No ETH found. Please fund this address first:");
                console.log("   https://starknet-faucet.vercel.app/");
                console.log("   https://faucet.goerli.starknet.io/\n");
                console.log("Then re-run: node deploy.js\n");
                process.exit(0);
            }
        } else {
            console.log("💰 ETH balance: (could not fetch — check manually)");
            console.log(`   Faucet: https://starknet-faucet.vercel.app/`);
        }

        // Try to deploy the account
        console.log("\n🏗️  Deploying the deployer account...");
        const publicKey = ec.starkCurve.getStarkKey(PRIVATE_KEY);
        const accountCalldata = CallData.compile({ publicKey });

        const preDeployAccount = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);
        const deployAccountPayload = {
            classHash: OZ_ACCOUNT_CLASS_HASH,
            constructorCalldata: accountCalldata,
            contractAddress: ACCOUNT_ADDRESS,
            addressSalt: publicKey,
        };

        try {
            const deployAccountResponse = await preDeployAccount.deployAccount(deployAccountPayload);
            console.log(`✅ Account deploy tx: ${deployAccountResponse.transaction_hash}`);
            console.log("⏳ Waiting for account deployment (up to 5 min)...");
            await provider.waitForTransaction(deployAccountResponse.transaction_hash);
            console.log("✅ Account deployed!\n");
        } catch (e) {
            if (e.message?.includes("already deployed") || e.message?.includes("ALREADY_DEPLOYED")) {
                console.log("ℹ️  Account already deployed. Continuing...\n");
            } else {
                console.error("❌ Account deployment failed:", e.message?.split("\n")[0]);
                console.log("\n💡 Tip: Make sure the account address has ETH for fees.");
                console.log(`   Fund at: https://starknet-faucet.vercel.app/`);
                console.log(`   Address: ${ACCOUNT_ADDRESS}\n`);
                process.exit(1);
            }
        }
    } else {
        console.log(`✅ Deployer account is on-chain: ${ACCOUNT_ADDRESS}`);
        const balance = await getEthBalance(provider, ACCOUNT_ADDRESS);
        if (balance !== null) {
            const ethStr = (Number(balance) / 1e18).toFixed(6);
            console.log(`💰 ETH balance: ${ethStr} ETH`);
        }
        console.log();
    }

    // 3. Instantiate a funded account for sending transactions
    const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);
    account.blockIdentifier = "latest";

    // 4. Compute and declare the contract class
    const classHash = hash.computeSierraContractClassHash(sierra);
    console.log(`🔑 Contract class hash: ${classHash}`);

    let finalClassHash = classHash;
    try {
        console.log("📝 Declaring contract class (or skipping if already declared)...");
        const declareResp = await account.declareIfNot({ contract: sierra, casm });
        if (declareResp.transaction_hash) {
            console.log(`✅ Declared! Tx: ${declareResp.transaction_hash}`);
            await provider.waitForTransaction(declareResp.transaction_hash);
            console.log("✅ Declaration confirmed!\n");
        } else {
            console.log("ℹ️  Already declared — skipping.\n");
        }
        finalClassHash = declareResp.class_hash || classHash;
    } catch (err) {
        const msg = String(err.message || err);
        if (msg.includes("ClassAlreadyDeclared") || msg.includes("already declared")) {
            console.log("ℹ️  Class already on-chain. Proceeding.\n");
        } else {
            throw err;
        }
    }

    // 5. Deploy the GameScores contract instance (no constructor args)
    console.log("🏗️  Deploying GameScores contract instance...");
    const deployResp = await account.deployContract({
        classHash: finalClassHash,
        constructorCalldata: CallData.compile({}),
        salt: stark.randomAddress(),
    });

    console.log(`✅ Deploy tx: ${deployResp.transaction_hash}`);
    console.log("⏳ Waiting for confirmation...");
    await provider.waitForTransaction(deployResp.transaction_hash);
    console.log("✅ Confirmed!\n");

    const contractAddress = deployResp.contract_address;

    // 6. Print results
    console.log("═══════════════════════════════════════════════════════");
    console.log("🎉  GameScores is LIVE on Starknet Sepolia!");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`📍  Contract Address : ${contractAddress}`);
    console.log(`🔑  Class Hash       : ${finalClassHash}`);
    console.log(`🌐  Network          : Starknet Sepolia`);
    console.log("═══════════════════════════════════════════════════════");
    console.log(`\n🔗  Starkscan : https://sepolia.starkscan.co/contract/${contractAddress}`);
    console.log(`🔗  Voyager   : https://sepolia.voyager.online/contract/${contractAddress}\n`);

    // 7. Smoke test
    try {
        const contract = new Contract(sierra.abi, contractAddress, provider);
        const total = await contract.get_total_players();
        console.log(`🧪 Smoke test → get_total_players() = ${total} ✅\n`);
    } catch (e) {
        console.warn(`🧪 Smoke test skipped: ${e.message?.split("\n")[0]}\n`);
    }

    // 8. Persist deployment info
    const info = {
        network: "sepolia",
        contractAddress,
        classHash: finalClassHash,
        deployTxHash: deployResp.transaction_hash,
        deployedAt: new Date().toISOString(),
        deployer: ACCOUNT_ADDRESS,
    };
    fs.writeFileSync(path.join(__dirname, "deployment.json"), JSON.stringify(info, null, 2));
    console.log("💾 Saved deployment.json");

    // 9. Patch .env
    const envPath = path.join(__dirname, ".env");
    if (fs.existsSync(envPath)) {
        let env = fs.readFileSync(envPath, "utf8");
        env = env.replace(/REACT_APP_GAME_SCORES_CONTRACT=.*/, `REACT_APP_GAME_SCORES_CONTRACT=${contractAddress}`);
        fs.writeFileSync(envPath, env);
        console.log(`💾 Updated .env → REACT_APP_GAME_SCORES_CONTRACT=${contractAddress}`);
    }

    console.log("\n✨ All done!\n");
}

main().catch((err) => {
    console.error("\n❌ Deployment failed:", err.message || err);
    process.exit(1);
});
