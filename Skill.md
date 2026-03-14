---
name: starkzap-sdk
description: "Use when integrating or maintaining applications built with keep-starknet-strange/starkzap. Covers StarkSDK setup, onboarding (Signer/Privy/Cartridge), wallet lifecycle, sponsored transactions, ERC20 transfers, staking flows, tx builder batching, examples, tests, and generated presets."
license: Apache-2.0
metadata:
  author: keep-starknet-strange
  version: "1.0.0"
  org: keep-starknet-strange
compatibility: "Node.js 20+, TypeScript 5+, starkzap repository workflows"
keywords:
  - starknet
  - starkzap
  - sdk
  - typescript
  - onboarding
  - wallet
  - privy
  - cartridge
  - paymaster
  - erc20
  - staking
  - tx-builder
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - Task
user-invocable: true
---

# Starkzap SDK

Project-focused guide for `https://github.com/keep-starknet-strange/starkzap`.

Use this skill when requests involve Starkzap SDK code, examples, or docs.

## When To Use

Trigger for tasks like:
- "Add a new onboarding flow in Starkzap"
- "Fix sponsored transaction behavior in wallet.execute"
- "Update staking pool logic or validator presets"
- "Patch Privy signer/server integration"
- "Review Starkzap tests/docs/examples"

## SDK Scope — What Is and Is NOT Included

The starkzap SDK covers **wallet connectivity, account management, ERC20 operations, staking delegation, and transaction building**. It does NOT include:
- Swap / DEX aggregation (use AVNU or a separate swap SDK)
- Lending / Borrowing (use zkLend, Nostra, or direct contract calls)
- DCA (Dollar Cost Averaging)
- NFT operations
- Bridge operations
- Yield farming / Liquidity provision

For general DeFi operations (swaps, DCA, lending), use a separate integration. The starkzap wallet's `wallet.execute()` and `wallet.callContract()` can interact with any Starknet contract directly.

## Repository Map

Primary implementation:
- `src/sdk.ts` - top-level orchestration (`StarkSDK`)
- `src/wallet/*` - wallet implementations and lifecycle
- `src/signer/*` - `StarkSigner`, `PrivySigner`, signer adapter
- `src/tx/*` - `Tx` and `TxBuilder`
- `src/erc20/*` - token helpers, balance/transfer logic
- `src/staking/*` - staking operations and pool discovery
- `src/types/*` - shared domain types (`Address`, `Amount`, config)

Operational and docs:
- `tests/*` and `tests/integration/*`
- `examples/web`, `examples/server`, `examples/mobile`, `examples/flappy-bird`
- `scripts/*` for generated artifacts in the Starkzap repo
- `docs/*` and `mintlify-docs/*`

Skill resources:
- `skills/starkzap-sdk/references/signer-integration.md` - signer trust boundaries and auth assumptions
- `skills/starkzap-sdk/references/sponsored-transactions.md` - paymaster flow and fee mode behavior
- `skills/starkzap-sdk/references/erc20-helpers.md` - `Amount` semantics and transfer patterns
- `skills/starkzap-sdk/references/staking-reliability.md` - pool discovery and timeout/abort safety
- `skills/starkzap-sdk/scripts/wallet-execute-example.ts` - wallet readiness and execute flow
- `skills/starkzap-sdk/scripts/staking-pool-discovery.ts` - staking pool discovery and diagnostics

## Common Pitfalls — READ BEFORE WRITING CODE

These are exact API gotchas discovered during real integration. Violating any of these causes type errors or runtime failures.

### 1. `Address` is a branded type — always use `fromAddress()`

`Address` is `string & { readonly __type: "StarknetAddress" }`. You CANNOT pass a plain `string` where `Address` is expected.

```typescript
import { fromAddress } from "starkzap";

// WRONG — will not compile
await wallet.stakingInStaker("0x123...", token);

// CORRECT
await wallet.stakingInStaker(fromAddress("0x123..."), token);
```

### 2. Validator presets are objects, not arrays — no `getValidators()` function

There is NO `getValidators()` function. Validators are exported as keyed objects.

```typescript
import { sepoliaValidators, mainnetValidators } from "starkzap";

// WRONG — does not exist
const validators = getValidators("sepolia");

// CORRECT — use Object.values() to get an array
const validators = Object.values(sepoliaValidators);
// Each entry: { name: string, stakerAddress: Address, logoUrl: URL | null }
```

### 3. Token presets are objects, not arrays — no `getTokens()` function

Same pattern as validators. Also available: `getPresets(chainId)` returns `Record<string, Token>`.

```typescript
import { sepoliaTokens, mainnetTokens } from "starkzap";

// Get all tokens as array
const tokens = Object.values(sepoliaTokens);
// Each entry: { name, address: Address, decimals, symbol, metadata?: { logoUrl } }

// Or use the chainId-based helper
import { getPresets } from "starkzap";
const tokenMap = getPresets(ChainId.SEPOLIA); // Record<string, Token>
```

### 4. No `wallet.activeTokens()` — use `sdk.stakingTokens()` or import presets

```typescript
// WRONG — method does not exist
const tokens = await wallet.activeTokens();

// CORRECT — for staking tokens only
const stakingTokens = await sdk.stakingTokens();

// CORRECT — for all known tokens
import { sepoliaTokens } from "starkzap";
const allTokens = Object.values(sepoliaTokens);
```

### 5. Staking class methods require `wallet` as first parameter

Every mutation and query method on the `Staking` class takes `wallet` as its first argument.

```typescript
// WRONG — missing wallet parameter
await staking.stake(amount);
await staking.getPosition();
await staking.claimRewards();

// CORRECT
await staking.stake(wallet, amount);
await staking.getPosition(wallet);
await staking.claimRewards(wallet);
await staking.exitIntent(wallet, amount);
await staking.exit(wallet);
await staking.isMember(wallet);

// EXCEPTION — getCommission() does NOT take wallet
await staking.getCommission(); // returns Promise<number>
```

### 6. `wallet.stakingInStaker()` requires BOTH `stakerAddress` AND `token`

```typescript
// WRONG — missing token parameter
const staking = await wallet.stakingInStaker(stakerAddress);

// CORRECT
const staking = await wallet.stakingInStaker(fromAddress(stakerAddress), token);
```

### 7. `PoolMember` fields are `Amount` objects, `unpoolTime` is `Date | null`

```typescript
const pos = await staking.getPosition(wallet);
if (!pos) return; // null means no position

// WRONG — these are Amount objects, not numbers or bigints
if (pos.staked > 0) { ... }

// CORRECT — use Amount methods
if (pos.staked.isPositive()) { ... }
pos.staked.toUnit();       // "1.5" — human-readable string
pos.staked.toFormatted();  // "1.5 STRK" — formatted with symbol
pos.staked.toBase();       // 1500000000000000000n — raw bigint
pos.staked.isZero();       // boolean

// unpoolTime is Date | null, NOT a unix timestamp
if (pos.unpoolTime) {
  const unixSeconds = Math.floor(pos.unpoolTime.getTime() / 1000);
}

// Full PoolMember shape:
// {
//   staked: Amount,
//   rewards: Amount,
//   total: Amount,
//   unpooling: Amount,
//   unpoolTime: Date | null,
//   commissionPercent: number,
//   rewardAddress: Address,
// }
```

### 8. `wallet.balanceOf()` returns `Amount`, not a string or bigint

```typescript
const balance = await wallet.balanceOf(token);

// WRONG
console.log(`Balance: ${balance} STRK`);

// CORRECT
console.log(`Balance: ${balance.toUnit()} STRK`);    // "1.5 STRK"
console.log(`Balance: ${balance.toFormatted()}`);      // "1.5 STRK" (includes symbol)
```

### 9. `OnboardResult` returns an object, not the wallet directly

```typescript
// WRONG
const wallet = await sdk.onboard({ ... });

// CORRECT
const result = await sdk.onboard({ ... });
const wallet = result.wallet;
// result also has: strategy, deployed (boolean), metadata?
```

### 10. `Validator` type uses `stakerAddress` and `logoUrl`

```typescript
// The Validator interface:
// {
//   name: string,
//   stakerAddress: Address,    // NOT "address"
//   logoUrl: URL | null,       // NOT string — use .toString() for display
// }
```

## Quick Reference

Common starknet.js patterns (provider/account/call/execute/listen):

```typescript
import { Account, Contract, RpcProvider } from "starknet";

const provider = await RpcProvider.create({
  nodeUrl: process.env.RPC_URL!,
});

const account = new Account({
  provider,
  address: process.env.ACCOUNT_ADDRESS!,
  signer: process.env.PRIVATE_KEY!,
  cairoVersion: "1",
});

const contract = new Contract({
  abi,
  address: process.env.CONTRACT_ADDRESS!,
  providerOrAccount: account,
});
await contract.call("balance_of", [account.address]); // read

const tx = await account.execute([
  {
    contractAddress: process.env.CONTRACT_ADDRESS!,
    entrypoint: "do_work",
    calldata: [],
  },
]);
await provider.waitForTransaction(tx.transaction_hash);
```

```typescript
// With Starkzap Tx wrapper
const submitted = await wallet.execute(calls, { feeMode: "user_pays" });
// Tx has: hash (string), explorerUrl (string)
const stop = submitted.watch(
  ({ finality, execution }) => console.log(finality, execution),
  { pollIntervalMs: 5000, timeoutMs: 120000 }
);
// stop(); // call to unsubscribe early
await submitted.wait(); // or just wait for finality
const receipt = await submitted.receipt(); // full receipt (cached)
```

Common error classes and immediate recovery:

| Error Class | Typical Signal | Immediate Recovery |
| --- | --- | --- |
| `VALIDATION_ERROR` | `Invalid token decimals`, `Amount.parse(...)` failure | Re-check token decimals/symbol, parse from known token preset, avoid mixing token types. |
| `UNDEPLOYED_ACCOUNT` | `Account is not deployed` on `wallet.execute(...)` | Run `wallet.ensureReady({ deploy: "if_needed" })` before `user_pays` writes. |
| `RPC_OR_NETWORK` | timeout, 429, provider mismatch | Retry with backoff, confirm `rpcUrl` and `chainId`, switch to stable RPC for production. |
| `TX_REVERTED` | `preflight.ok === false` or reverted receipt | Run `wallet.preflight({ calls })`, inspect reason, reduce batch size, verify call ordering. |
| `AUTH_OR_PERMISSION` | Privy 401/403, invalid signature response | Verify signer server auth, headers/body resolver, and trusted `serverUrl`. |

See also:
- `skills/starkzap-sdk/references/*` for implementation-specific troubleshooting
- `skills/starkzap-sdk/scripts/*` for runnable diagnostic examples

## Core Workflows

### 1) Configure `StarkSDK` and Connect Wallets

Common API path:
1. Instantiate `StarkSDK` with `network` or `rpcUrl + chainId`.
2. Use `sdk.onboard(...)` or `sdk.connectWallet(...)` or `sdk.connectCartridge(...)`.
3. Call `wallet.ensureReady({ deploy: "if_needed" })` before user-pays writes.

Supported onboarding strategies:
- `OnboardStrategy.Signer`
- `OnboardStrategy.Privy`
- `OnboardStrategy.Cartridge`

For Cartridge:
- Treat as web-only runtime.
- Expect popup/session behavior and policy scoping requirements.
- `sdk.connectCartridge()` returns `CartridgeWalletInterface` with extra methods: `getController()`, `username()`.

```typescript
import {
  ChainId,
  OnboardStrategy,
  StarkSDK,
  StarkSigner,
} from "starkzap";

const sdk = new StarkSDK({ network: "sepolia" });

const customSdk = new StarkSDK({
  rpcUrl: process.env.RPC_URL!,
  chainId: ChainId.SEPOLIA,
});

// Signer onboarding
const signerResult = await sdk.onboard({
  strategy: OnboardStrategy.Signer,
  account: { signer: new StarkSigner(process.env.PRIVATE_KEY!) },
  feeMode: "user_pays",
  deploy: "if_needed",
});
const wallet = signerResult.wallet; // WalletInterface

// Privy onboarding
const privyResult = await sdk.onboard({
  strategy: OnboardStrategy.Privy,
  privy: {
    resolve: async () => ({
      walletId: process.env.PRIVY_WALLET_ID!,
      publicKey: process.env.PRIVY_PUBLIC_KEY!,
      serverUrl: process.env.PRIVY_SIGNER_URL!,
    }),
  },
  feeMode: "sponsored",
});

// Cartridge onboarding (web-only)
const cartridgeResult = await sdk.onboard({
  strategy: OnboardStrategy.Cartridge,
  cartridge: {
    preset: "controller",
    policies: [{ target: "0xTOKEN", method: "approve" }],
  },
  feeMode: "user_pays",
});
// cartridgeResult.wallet is WalletInterface

// Direct Cartridge connect (returns CartridgeWalletInterface with username())
const cartridgeWallet = await sdk.connectCartridge({
  policies: [{ target: "0xTOKEN", method: "approve" }],
});
const username = await cartridgeWallet.username(); // string | undefined

// Direct signer connect
const wallet2 = await sdk.connectWallet({
  account: { signer: new StarkSigner(process.env.PRIVATE_KEY!) },
  feeMode: "sponsored",
});

await wallet2.ensureReady({ deploy: "if_needed" });
```

### 2) Complete Wallet API Reference

```typescript
// --- Properties ---
wallet.address             // Address (branded string)

// --- Account Info ---
wallet.getAccount()        // starknet.js Account instance
wallet.getProvider()       // RpcProvider
wallet.getChainId()        // ChainId — use .toLiteral() for display
wallet.getFeeMode()        // "user_pays" | "sponsored"
wallet.getClassHash()      // string

// --- Deployment ---
await wallet.isDeployed()                              // boolean
await wallet.ensureReady({ deploy: "if_needed" })      // deploy if needed
await wallet.deploy()                                  // explicit deploy → Tx

// --- Transactions ---
await wallet.execute(calls, { feeMode: "user_pays" })  // → Tx
await wallet.preflight({ calls, feeMode })             // → { ok: true } | { ok: false, reason }
await wallet.estimateFee(calls)                        // → EstimateFeeResponseOverhead
await wallet.callContract({ contractAddress, entrypoint, calldata }) // read-only
await wallet.signMessage(typedData)                    // → Signature
wallet.tx()                                            // → TxBuilder (fluent)
await wallet.disconnect()                              // cleanup

// --- ERC20 ---
wallet.erc20(token)                    // → Erc20 instance (cached per token)
await wallet.balanceOf(token)          // → Amount
await wallet.transfer(token, [{ to: Address, amount: Amount }]) // → Tx

// --- Staking (convenience methods on wallet) ---
await wallet.stakingInStaker(stakerAddress, token)     // → Staking instance
await wallet.staking(poolAddress)                      // → Staking instance
await wallet.stake(poolAddress, amount)                // → Tx (auto enter/add)
await wallet.enterPool(poolAddress, amount)            // → Tx
await wallet.addToPool(poolAddress, amount)            // → Tx
await wallet.claimPoolRewards(poolAddress)             // → Tx
await wallet.exitPoolIntent(poolAddress, amount)       // → Tx
await wallet.exitPool(poolAddress)                     // → Tx
await wallet.isPoolMember(poolAddress)                 // → boolean
await wallet.getPoolPosition(poolAddress)              // → PoolMember | null
await wallet.getPoolCommission(poolAddress)            // → number
```

### 3) Staking via the Staking Class

The `Staking` class wraps a specific pool contract. Create via `wallet.stakingInStaker()` or `Staking.fromStaker()`.

**Critical**: All mutation/query methods take `wallet` as the first argument (except `getCommission()`).

```typescript
import { fromAddress, Amount } from "starkzap";
import type { WalletInterface, Token, Staking } from "starkzap";

// Discover pool from validator address
const staking = await wallet.stakingInStaker(
  fromAddress("0xVALIDATOR_STAKER_ADDRESS"),
  strkToken
);

// Query
const commission = await staking.getCommission();  // number (e.g. 10 = 10%)
const isMember = await staking.isMember(wallet);   // boolean
const position = await staking.getPosition(wallet); // PoolMember | null

// Stake (auto enter or add based on membership)
const amount = Amount.parse("100", strkToken);
const tx = await staking.stake(wallet, amount);
await tx.wait();

// Claim rewards
const claimTx = await staking.claimRewards(wallet);
await claimTx.wait();

// Exit (2-step: intent → wait cooldown → exit)
const exitTx = await staking.exitIntent(wallet, amount);
await exitTx.wait();
// ... wait for cooldown (check position.unpoolTime) ...
const completeTx = await staking.exit(wallet);
await completeTx.wait();
```

### 4) ERC20 Operations

```typescript
import { Amount, fromAddress, sepoliaTokens } from "starkzap";

const USDC = sepoliaTokens.USDC; // Token object from presets
const amount = Amount.parse("25", USDC);

// Balance
const balance = await wallet.balanceOf(USDC); // Amount object
console.log(balance.toUnit());      // "100.5"
console.log(balance.toFormatted()); // "100.5 USDC"
console.log(balance.isPositive());  // true

// Transfer
const tx = await wallet.transfer(USDC, [
  { to: fromAddress("0xRECIPIENT"), amount },
]);
await tx.wait();

// Via Erc20 class (for building calls without executing)
const erc20 = wallet.erc20(USDC);
const approveCalls = erc20.populateApprove(fromAddress("0xSPENDER"), amount);
const transferCalls = erc20.populateTransfer([
  { to: fromAddress("0xRECIPIENT"), amount },
]);
```

### 5) Amount Class Reference

```typescript
import { Amount } from "starkzap";

// Creation
const a = Amount.parse("1.5", token);         // from human-readable + Token
const b = Amount.parse("1.5", 18, "STRK");   // from human-readable + decimals + symbol
const c = Amount.fromRaw(1500000000000000000n, token); // from raw bigint

// Conversion
a.toUnit();       // "1.5" — human-readable string
a.toBase();       // 1500000000000000000n — raw bigint
a.toFormatted();  // "1.5 STRK" — with symbol
a.getDecimals();  // 18
a.getSymbol();    // "STRK" | undefined

// Arithmetic (returns new Amount)
a.add(b);          a.subtract(b);
a.multiply(2n);    a.divide(3n);

// Comparison
a.eq(b);    a.gt(b);    a.gte(b);
a.lt(b);    a.lte(b);
a.isZero();  a.isPositive();
```

### 6) TxBuilder — Batched Operations

```typescript
// Approve + stake in one atomic transaction
const tx = await wallet.tx()
  .stake(poolAddress, Amount.parse("100", STRK))
  .send();
await tx.wait();

// Multi-transfer + claim rewards atomically
const tx2 = await wallet.tx()
  .transfer(USDC, [
    { to: alice, amount: Amount.parse("50", USDC) },
    { to: bob, amount: Amount.parse("25", USDC) },
  ])
  .claimPoolRewards(poolAddress)
  .send();

// Mix helpers with raw calls
const tx3 = await wallet.tx()
  .approve(STRK, dexAddress, amount)
  .add({ contractAddress: dexAddress, entrypoint: "swap", calldata: [...] })
  .transfer(USDC, { to: alice, amount: usdcAmount })
  .send();

// Inspection before sending
const builder = wallet.tx().stake(poolAddress, amount);
console.log(builder.length);          // number of operations
const calls = await builder.calls();  // resolved Call[]
const fee = await builder.estimateFee();
const preflight = await builder.preflight(); // { ok: true } | { ok: false, reason }
const sentTx = await builder.send();  // can only call send() once
```

### 7) Tx Class — Transaction Tracking

```typescript
const tx = await wallet.execute(calls, { feeMode: "user_pays" });

tx.hash;         // transaction hash string
tx.explorerUrl;  // block explorer URL

await tx.wait(); // wait for ACCEPTED_ON_L2

// Or watch with real-time updates
const unsubscribe = tx.watch(
  ({ finality, execution }) => {
    console.log(finality);   // e.g. "ACCEPTED_ON_L2"
    console.log(execution);  // e.g. "SUCCEEDED" or "REVERTED"
  },
  {
    pollIntervalMs: 4000,
    timeoutMs: 300000,
    onError: (err) => console.error(err),
  }
);

const receipt = await tx.receipt(); // full receipt (cached after first fetch)
```

### 8) Execute Transactions (`wallet.execute`, `wallet.preflight`, `wallet.tx`)

Use:
- `wallet.execute(calls, options)` for direct execution.
- `wallet.preflight({ calls, feeMode })` for simulation checks.
- `wallet.tx()` (`TxBuilder`) for batched operations with deterministic ordering.

```typescript
const calls = [
  {
    contractAddress: process.env.CONTRACT_ADDRESS!,
    entrypoint: "do_work",
    calldata: [],
  },
];

const preflight = await wallet.preflight({
  calls,
  feeMode: "user_pays",
});
if (!preflight.ok) {
  throw new Error(`Preflight failed: ${preflight.reason}`);
}

const userPaysTx = await wallet.execute(calls, { feeMode: "user_pays" });
await userPaysTx.wait();

const sponsoredTx = await wallet.execute(calls, { feeMode: "sponsored" });
await sponsoredTx.wait();

const batchedTx = await wallet
  .tx()
  .add(...calls)
  .send({ feeMode: "sponsored" });
await batchedTx.wait();
```

```typescript
function getSdkErrorClass(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("not deployed")) return "UNDEPLOYED_ACCOUNT";
  if (message.includes("timed out") || message.includes("429")) {
    return "RPC_OR_NETWORK";
  }
  if (message.includes("signature") || message.includes("Privy")) {
    return "AUTH_OR_PERMISSION";
  }
  if (message.includes("reverted") || message.includes("preflight")) {
    return "TX_REVERTED";
  }
  if (message.includes("Invalid") || message.includes("Amount")) {
    return "VALIDATION_ERROR";
  }
  return "UNKNOWN";
}

try {
  await wallet.execute(calls, { feeMode: "user_pays" });
} catch (error) {
  const kind = getSdkErrorClass(error);
  if (kind === "UNDEPLOYED_ACCOUNT") {
    await wallet.ensureReady({ deploy: "if_needed" });
  }
  throw error;
}
```

When changing execution behavior:
- Audit deploy vs execute path for undeployed accounts.
- Verify runtime constraints (`OnboardStrategy.Cartridge` is web-only).
- Cover both `user_pays` and `sponsored` branches in tests.

### 9) Examples + Integration Surfaces

Check for drift between:
- `examples/web/main.ts`
- `examples/server/server.ts`
- `README` and docs links

Specifically verify endpoint and auth consistency for Privy + paymaster proxy flows.

## Guardrails

Do not hand-edit generated files:
- `src/erc20/token/presets.ts`
- `src/erc20/token/presets.sepolia.ts`
- `src/staking/validator/presets.ts`
- `src/staking/validator/presets.sepolia.ts`
- `docs/api/**`
- `docs/export/**`

Regenerate with scripts:

```bash
npm run generate:tokens
npm run generate:tokens:sepolia
npm run generate:validators
npm run generate:validators:sepolia
npm run docs:api
npm run docs:export
```

Keep API export changes explicit:
- If new public API is added/removed, update `src/index.ts`.

## Validation Checklist

Run minimal set first:

```bash
npm run typecheck
npm test
```

Run broader checks when behavior is cross-cutting:

```bash
npm run build
npm run test:all
```

Integration tests may require local devnet/fork setup:

```bash
npm run test:integration
```

If not run, clearly report why.

## Error Codes & Recovery

Map observed errors to actionable recovery:

| Error Class | Typical Trigger | Recovery Steps |
| --- | --- | --- |
| `VALIDATION_ERROR` | `Amount.parse(...)`/token mismatch, malformed address, invalid config | Confirm token decimals/symbol, re-create `Amount` from known token presets, validate config against `src/types/*` and `src/sdk.ts`. |
| `RPC_OR_NETWORK` | RPC timeout, `429`, transient JSON-RPC failures, chain mismatch | Retry with exponential backoff, check `rpcUrl`/`chainId`, verify provider health, reduce batch size for retries. |
| `TX_REVERTED` | `wallet.preflight(...)` fails or receipt is reverted | Run `wallet.preflight({ calls, feeMode })` first, inspect revert reason, reorder calls in `wallet.tx()`, split large multicalls. |
| `RATE_LIMIT_OR_TIMEOUT` | `tx.watch` timeout, stalled polling, pool resolution timeout | Increase timeout where appropriate, add abort handling, retry on fresh provider session, avoid parallel heavy queries. |
| `AUTH_OR_PERMISSION` | Privy signing errors, 401/403, invalid signature payloads | Verify signer server auth headers/body, validate trusted `serverUrl`, check `examples/server/server.ts` auth middleware alignment. |
| `UNDEPLOYED_ACCOUNT` | `wallet.execute(..., { feeMode: "user_pays" })` on undeployed account | Run `wallet.ensureReady({ deploy: "if_needed" })`, then retry execution; use sponsored mode only when paymaster path is configured. |
| `GENERATED_ASSET_DRIFT` | Preset/docs changes diverge from source of truth | Regenerate via `npm run generate:tokens`, `npm run generate:tokens:sepolia`, `npm run generate:validators`, `npm run generate:validators:sepolia`, `npm run docs:api`, `npm run docs:export`. |

If a fix is uncertain:
- Reproduce with the closest example in `examples/*`.
- Capture command, environment, and failing test IDs.
- Report exact file/path + remediation attempted.

## Useful Task Patterns

- **Bug fix in wallet lifecycle**:
  - inspect `src/wallet/index.ts`, `src/wallet/utils.ts`
  - patch
  - update `tests/wallet*.test.ts`

- **Privy auth/signature issue**:
  - inspect `src/signer/privy.ts`
  - align with `examples/server/server.ts`
  - update `tests/privy-signer.test.ts`

- **Staking regression**:
  - inspect `src/staking/staking.ts`, `src/staking/presets.ts`
  - add/adjust integration assertions in `tests/integration/staking.test.ts`

## Example Prompt

"Use this skill to fix Starkzap sponsored execution for undeployed accounts, add tests, and list behavior changes."