import { readFile } from "fs/promises";
import { Account, RpcProvider } from "starknet";

async function main() {
  const {
    STARKNET_RPC_URL,
    DEPLOYER_PRIVATE_KEY,
    DEPLOYER_ADDRESS,
  } = process.env;

  if (!STARKNET_RPC_URL || !DEPLOYER_PRIVATE_KEY || !DEPLOYER_ADDRESS) {
    console.error(
      "Missing env vars. Make sure STARKNET_RPC_URL, DEPLOYER_PRIVATE_KEY and DEPLOYER_ADDRESS are set.",
    );
    process.exit(1);
  }

  const provider = await RpcProvider.create({
    nodeUrl: STARKNET_RPC_URL,
  });

  const account = new Account({
    provider,
    address: DEPLOYER_ADDRESS,
    signer: DEPLOYER_PRIVATE_KEY,
    cairoVersion: "1",
  });

  console.log("Using account:", account.address);

  const sierraPath =
    "./game_scores/target/dev/game_scores_GameScores.contract_class.json";
  const casmPath =
    "./game_scores/target/dev/game_scores_GameScores.compiled_contract_class.json";

  console.log("Reading compiled artifacts...");
  const compiledSierra = JSON.parse(await readFile(sierraPath, "utf8"));
  const compiledCasm = JSON.parse(await readFile(casmPath, "utf8"));

  console.log("Declaring contract on Starknet...");
  const declareResponse = await account.declare({
    contract: compiledSierra,
    casm: compiledCasm,
  });
  console.log("Declare tx hash:", declareResponse.transaction_hash);
  await provider.waitForTransaction(declareResponse.transaction_hash);

  const classHash = declareResponse.class_hash;
  console.log("Declared class hash:", classHash);

  console.log("Deploying contract instance...");
  const deployResponse = await account.deployContract({
    classHash,
    constructorCalldata: [],
  });

  console.log("Deploy tx hash:", deployResponse.transaction_hash);
  await provider.waitForTransaction(deployResponse.transaction_hash);

  const contractAddress = deployResponse.contract_address;
  console.log("Deployed contract address:", contractAddress);

  console.log("\n=== Deployment summary ===");
  console.log("RPC URL:          ", STARKNET_RPC_URL);
  console.log("Deployer address: ", DEPLOYER_ADDRESS);
  console.log("Class hash:       ", classHash);
  console.log("Contract address: ", contractAddress);
}

main().catch((err) => {
  console.error("Deployment failed:", err);
  process.exit(1);
});

