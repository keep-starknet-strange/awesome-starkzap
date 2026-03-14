# SKILL: On-Chain Game Data Storage with StarkZap
## Store Highest Scores & Staking on Starknet — Gasless

---

## What This Skill Does

This skill guides your IDE agent to:
1. **Write a Cairo smart contract** that stores on-chain game data (highest scores, per-player records, staking state)
2. **Deploy it to Starknet Sepolia** (testnet first) then mainnet
3. **Integrate starkzap** (`npm install starkzap`) to interact with the deployed contract — gaslessly via Cartridge Controller or AVNU Paymaster
4. **Wire it into your game** (Boris / Level Devil) so every high score gets committed on-chain without the player paying gas

**Priority order for implementation:**
- [x] **PRIORITY 1 — HighScore contract** (store/read per-player & global leaderboard)
- [ ] PRIORITY 2 — Staking contract (lock tokens, earn rewards, withdraw)

---

## Prerequisites

```bash
# 1. Install starkzap (already done per your message)
npm install starkzap

# 2. Install Cartridge Controller (for gasless gaming)
npm install @cartridge/controller

# 3. Install Starknet toolchain for Cairo contract development
curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh
snfoundryup

# 4. Install Scarb (Cairo package manager)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Verify
scarb --version        # should print scarb version
snforge --version      # should print starknet foundry version
```

---

## PART 1 — Cairo Smart Contract

### 1A. Project Scaffold

```bash
scarb new game_scores
cd game_scores
```

Edit `Scarb.toml`:

```toml
[package]
name = "game_scores"
version = "0.1.0"
edition = "2024_07"

[dependencies]
starknet = ">=2.6.0"

[[target.starknet-contract]]
sierra = true
casm = true
```

---

### 1B. HighScore Contract — Cairo Source

Create `src/lib.cairo`:

```cairo
// ═══════════════════════════════════════════════════════
// GameScores — On-Chain Highest Score Storage
// Deployed on Starknet. Gasless via Cartridge paymaster.
// ═══════════════════════════════════════════════════════

use starknet::ContractAddress;

// ── EVENTS ──────────────────────────────────────────────
#[event]
#[derive(Drop, starknet::Event)]
enum Event {
    NewHighScore: NewHighScore,
    GlobalRecordBroken: GlobalRecordBroken,
}

#[derive(Drop, starknet::Event)]
struct NewHighScore {
    #[key]
    player: ContractAddress,
    score: u64,
    level: u8,
    timestamp: u64,
}

#[derive(Drop, starknet::Event)]
struct GlobalRecordBroken {
    player: ContractAddress,
    score: u64,
    previous_record: u64,
}

// ── STORAGE STRUCTS ──────────────────────────────────────
#[derive(Drop, Serde, starknet::Store, Clone)]
struct ScoreEntry {
    score: u64,
    level: u8,           // which level they reached
    deaths: u32,         // total deaths in that run
    coins: u32,          // coins collected
    timestamp: u64,      // block timestamp
}

// ── INTERFACE ────────────────────────────────────────────
#[starknet::interface]
trait IGameScores<TContractState> {
    // Write functions (require wallet, gasless via paymaster)
    fn submit_score(
        ref self: TContractState,
        score: u64,
        level: u8,
        deaths: u32,
        coins: u32,
    );

    // Read functions (free, no wallet needed)
    fn get_player_best(self: @TContractState, player: ContractAddress) -> ScoreEntry;
    fn get_global_record(self: @TContractState) -> ScoreEntry;
    fn get_global_record_holder(self: @TContractState) -> ContractAddress;
    fn get_total_players(self: @TContractState) -> u64;
    fn has_played(self: @TContractState, player: ContractAddress) -> bool;
}

// ── CONTRACT ─────────────────────────────────────────────
#[starknet::contract]
mod GameScores {
    use super::{ContractAddress, IGameScores, ScoreEntry, Event, NewHighScore, GlobalRecordBroken};
    use starknet::{get_caller_address, get_block_timestamp};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess,
        Map, StorageMapReadAccess, StorageMapWriteAccess,
    };

    #[storage]
    struct Storage {
        // Per-player best score
        player_best: Map<ContractAddress, ScoreEntry>,
        // Whether a player has submitted at least once
        player_exists: Map<ContractAddress, bool>,
        // Global all-time high score entry
        global_record: ScoreEntry,
        // Who holds the global record
        global_record_holder: ContractAddress,
        // Total unique players
        total_players: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        // Initialize with zeroed global record
        self.global_record.write(ScoreEntry {
            score: 0,
            level: 0,
            deaths: 0,
            coins: 0,
            timestamp: 0,
        });
    }

    #[abi(embed_v0)]
    impl GameScoresImpl of IGameScores<ContractState> {

        // ── SUBMIT SCORE ───────────────────────────────
        // Called by the game client after completing a run.
        // Only updates if the new score is higher than the
        // player's current personal best.
        // Gasless when using Cartridge or AVNU paymaster.
        fn submit_score(
            ref self: ContractState,
            score: u64,
            level: u8,
            deaths: u32,
            coins: u32,
        ) {
            let caller = get_caller_address();
            let now = get_block_timestamp();

            let new_entry = ScoreEntry { score, level, deaths, coins, timestamp: now };

            // Track new players
            if !self.player_exists.read(caller) {
                self.player_exists.write(caller, true);
                self.total_players.write(self.total_players.read() + 1);
            }

            // Only update personal best if score improved
            let current_best = self.player_best.read(caller);
            if score > current_best.score {
                self.player_best.write(caller, new_entry.clone());

                // Emit personal best event
                self.emit(Event::NewHighScore(NewHighScore {
                    player: caller,
                    score,
                    level,
                    timestamp: now,
                }));

                // Check if global record is broken
                let global = self.global_record.read();
                if score > global.score {
                    let old_record = global.score;
                    self.global_record.write(new_entry);
                    self.global_record_holder.write(caller);

                    self.emit(Event::GlobalRecordBroken(GlobalRecordBroken {
                        player: caller,
                        score,
                        previous_record: old_record,
                    }));
                }
            }
        }

        // ── READ FUNCTIONS ─────────────────────────────
        fn get_player_best(self: @ContractState, player: ContractAddress) -> ScoreEntry {
            self.player_best.read(player)
        }

        fn get_global_record(self: @ContractState) -> ScoreEntry {
            self.global_record.read()
        }

        fn get_global_record_holder(self: @ContractState) -> ContractAddress {
            self.global_record_holder.read()
        }

        fn get_total_players(self: @ContractState) -> u64 {
            self.total_players.read()
        }

        fn has_played(self: @ContractState, player: ContractAddress) -> bool {
            self.player_exists.read(player)
        }
    }
}
```

---

### 1C. Build & Test

```bash
# Build the contract
scarb build

# Run unit tests (add to src/lib.cairo under #[cfg(test)] module)
snforge test

# Output: target/dev/game_scores_GameScores.contract_class.json
```

---

## PART 2 — Deploy the Contract

### 2A. Environment Setup

Create `.env` in project root:

```bash
# Starknet Sepolia testnet
STARKNET_RPC_URL=https://starknet-sepolia.public.blastapi.io/rpc/v0_7

# Your deployer wallet (get STRK from faucet: https://starknet-faucet.vercel.app/)
DEPLOYER_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
DEPLOYER_ADDRESS=0xYOUR_WALLET_ADDRESS
```

### 2B. Declare & Deploy (Starknet Foundry)

```bash
# Step 1: Declare the contract class (register the code on-chain)
sncast --url $STARKNET_RPC_URL \
  declare \
  --contract-name GameScores \
  --account $DEPLOYER_ADDRESS \
  --private-key $DEPLOYER_PRIVATE_KEY

# Output: class_hash = 0xABC123...
# Save this class_hash!

# Step 2: Deploy an instance of the contract
# Constructor takes no arguments for this contract
sncast --url $STARKNET_RPC_URL \
  deploy \
  --class-hash 0xABC123...YOUR_CLASS_HASH \
  --account $DEPLOYER_ADDRESS \
  --private-key $DEPLOYER_PRIVATE_KEY

# Output: contract_address = 0xDEF456...
# SAVE THIS ADDRESS — you need it in the SDK integration
```

### 2C. Verify Deployment

```bash
# Read the global record (should be zeroed)
sncast --url $STARKNET_RPC_URL \
  call \
  --contract-address 0xDEF456...YOUR_CONTRACT \
  --function get_global_record \
  --calldata ""
```

---

## PART 3 — StarkZap SDK Integration

### 3A. SDK Config File

Create `src/starkzap/config.ts`:

```typescript
import { StarkZap, OnboardStrategy } from "starkzap";

// ── DEPLOYED CONTRACT ADDRESS ────────────────────────────
// Replace with your actual deployed address after Part 2
export const GAME_SCORES_CONTRACT = "0xDEF456...YOUR_CONTRACT_ADDRESS";

// ── NETWORK ──────────────────────────────────────────────
// Use "sepolia" for testing, "mainnet" for production
export const NETWORK = "sepolia" as const;

// ── GASLESS STRATEGY ─────────────────────────────────────
// Option A: Cartridge Controller (recommended for games)
//   - Users sign in with Google/Twitter/passkey
//   - ALL transactions auto-sponsored (zero gas for players)
//   - Perfect for Boris game
//
// Option B: AVNU Paymaster (for Privy / private key setups)
//   - You pay gas on behalf of users
//   - Requires AVNU API key from https://portal.avnu.fi
//   - Apply for Starknet Propulsion Program (up to $1M subsidy)

// ── CARTRIDGE SETUP (Option A — recommended) ─────────────
export const CARTRIDGE_POLICIES = [
  {
    // Allow the game to submit scores on the player's behalf
    target: GAME_SCORES_CONTRACT,
    method: "submit_score",
  },
  // Add staking contract methods here when PRIORITY 2 is built:
  // { target: STAKING_CONTRACT, method: "stake" },
  // { target: STAKING_CONTRACT, method: "withdraw" },
];

// ── SDK FACTORY (Cartridge path) ──────────────────────────
export async function createCartridgeSDK() {
  const sdk = new StarkZap({ network: NETWORK });
  return sdk;
}

// ── SDK FACTORY (AVNU Paymaster path) ────────────────────
export async function createAVNUSDK(paymasterApiKey: string) {
  const sdk = new StarkZap({
    network: NETWORK,
    paymaster: {
      nodeUrl: "https://starknet.paymaster.avnu.fi",
      apiKey: paymasterApiKey,
    },
  });
  return sdk;
}
```

---

### 3B. Wallet Connection

Create `src/starkzap/wallet.ts`:

```typescript
import { StarkZap, OnboardStrategy } from "starkzap";
import { CARTRIDGE_POLICIES, NETWORK } from "./config";

// ── CONNECT WALLET (Cartridge — gasless gaming) ───────────
// Call this when player clicks "Connect Wallet" in the game UI.
// Users sign in with Google/Twitter/passkey — no seed phrases.
// Once connected, score submissions are FREE for the player.
export async function connectGamingWallet() {
  const sdk = new StarkZap({ network: NETWORK });

  const onboard = await sdk.onboard({
    strategy: OnboardStrategy.Cartridge,
    cartridge: {
      policies: CARTRIDGE_POLICIES,
    },
    deploy: "if_needed", // auto-deploys wallet account if first time
  });

  return {
    wallet: onboard.wallet,
    sdk,
  };
}

// ── DISCONNECT / CHECK ────────────────────────────────────
export async function getWalletAddress(wallet: any): Promise<string> {
  const account = wallet.account;
  return account.address;
}
```

---

### 3C. Score Submission (Gasless)

Create `src/starkzap/scores.ts`:

```typescript
import type { Call } from "starknet";
import { GAME_SCORES_CONTRACT } from "./config";

// ── TYPES ─────────────────────────────────────────────────
export interface ScoreSubmission {
  score: number;       // raw score value
  level: number;       // 1–8 (which level reached)
  deaths: number;      // total deaths in this run
  coins: number;       // total coins collected
}

export interface ScoreEntry {
  score: bigint;
  level: number;
  deaths: number;
  coins: number;
  timestamp: bigint;
}

// ── SUBMIT SCORE ON-CHAIN ─────────────────────────────────
// Gasless: Cartridge paymaster covers the fee automatically.
// Only submits if this is a personal best (contract enforces this).
//
// Usage:
//   const { wallet } = await connectGamingWallet();
//   await submitHighScore(wallet, { score: 9500, level: 8, deaths: 3, coins: 42 });
export async function submitHighScore(
  wallet: any,
  data: ScoreSubmission,
): Promise<{ txHash: string; explorerUrl: string }> {

  const call: Call = {
    contractAddress: GAME_SCORES_CONTRACT,
    entrypoint: "submit_score",
    calldata: [
      data.score.toString(),    // u64 score
      data.level.toString(),    // u8 level reached
      data.deaths.toString(),   // u32 deaths
      data.coins.toString(),    // u32 coins collected
    ],
  };

  // Preflight: simulate first to catch errors before submitting
  const preflight = await wallet.preflight({ calls: [call] });
  if (!preflight.ok) {
    throw new Error(`Score submission would fail: ${preflight.reason}`);
  }

  // Execute — gasless because Cartridge paymaster covers it
  const tx = await wallet.execute([call]);

  // Wait for L2 confirmation
  await tx.wait();

  return {
    txHash: tx.hash,
    explorerUrl: tx.explorerUrl,
  };
}

// ── READ GLOBAL LEADERBOARD ───────────────────────────────
// This is a FREE read — no wallet needed, no gas.
// Call this to display the all-time high score in the game UI.
export async function fetchGlobalRecord(sdk: any): Promise<{
  score: number;
  level: number;
  deaths: number;
  coins: number;
  holder: string;
}> {
  const provider = sdk.provider;

  // Read the best score entry
  const result = await provider.callContract({
    contractAddress: GAME_SCORES_CONTRACT,
    entrypoint: "get_global_record",
    calldata: [],
  });

  // Read who holds the record
  const holderResult = await provider.callContract({
    contractAddress: GAME_SCORES_CONTRACT,
    entrypoint: "get_global_record_holder",
    calldata: [],
  });

  return {
    score: Number(BigInt(result[0])),
    level: Number(result[1]),
    deaths: Number(result[2]),
    coins: Number(result[3]),
    holder: holderResult[0], // hex address string
  };
}

// ── READ PLAYER'S PERSONAL BEST ───────────────────────────
// Free read. Pass the player's wallet address.
export async function fetchPlayerBest(
  sdk: any,
  playerAddress: string,
): Promise<ScoreEntry | null> {
  const provider = sdk.provider;

  const result = await provider.callContract({
    contractAddress: GAME_SCORES_CONTRACT,
    entrypoint: "get_player_best",
    calldata: [playerAddress],
  });

  const score = BigInt(result[0]);
  if (score === 0n) return null; // Player hasn't played yet

  return {
    score,
    level: Number(result[1]),
    deaths: Number(result[2]),
    coins: Number(result[3]),
    timestamp: BigInt(result[4]),
  };
}

// ── READ TOTAL PLAYERS ────────────────────────────────────
export async function fetchTotalPlayers(sdk: any): Promise<number> {
  const provider = sdk.provider;
  const result = await provider.callContract({
    contractAddress: GAME_SCORES_CONTRACT,
    entrypoint: "get_total_players",
    calldata: [],
  });
  return Number(BigInt(result[0]));
}
```

---

### 3D. Game Integration Hook (React)

Create `src/hooks/useOnChainScores.ts`:

```typescript
import { useState, useCallback } from "react";
import { connectGamingWallet } from "../starkzap/wallet";
import {
  submitHighScore,
  fetchGlobalRecord,
  fetchPlayerBest,
  fetchTotalPlayers,
  type ScoreSubmission,
} from "../starkzap/scores";
import { createCartridgeSDK } from "../starkzap/config";

// ── HOOK ──────────────────────────────────────────────────
// Usage in game component:
//
//   const { connectWallet, submitScore, globalRecord, isConnected } = useOnChainScores();
//
//   // When player wins a level or completes a run:
//   await submitScore({ score: 9500, level: 8, deaths: 3, coins: 42 });
export function useOnChainScores() {
  const [wallet, setWallet] = useState<any>(null);
  const [sdk, setSdk] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [playerAddress, setPlayerAddress] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>("");
  const [globalRecord, setGlobalRecord] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // ── CONNECT ──────────────────────────────────────────
  const connectWallet = useCallback(async () => {
    try {
      setError("");
      const { wallet: w, sdk: s } = await connectGamingWallet();
      setWallet(w);
      setSdk(s);
      setIsConnected(true);
      setPlayerAddress(w.account.address);
    } catch (err: any) {
      setError(`Failed to connect: ${err.message}`);
    }
  }, []);

  // ── SUBMIT SCORE ──────────────────────────────────────
  // Call this at game-over / level-complete with the run data.
  // Gasless — player never sees a gas prompt.
  const submitScore = useCallback(async (data: ScoreSubmission) => {
    if (!wallet) {
      setError("Connect wallet first");
      return null;
    }
    try {
      setIsSubmitting(true);
      setError("");
      const result = await submitHighScore(wallet, data);
      setLastTxHash(result.txHash);
      return result;
    } catch (err: any) {
      setError(`Score submission failed: ${err.message}`);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [wallet]);

  // ── LOAD GLOBAL RECORD ────────────────────────────────
  const loadGlobalRecord = useCallback(async () => {
    try {
      const s = sdk ?? (await createCartridgeSDK());
      const record = await fetchGlobalRecord(s);
      setGlobalRecord(record);
      return record;
    } catch (err: any) {
      setError(`Failed to load leaderboard: ${err.message}`);
      return null;
    }
  }, [sdk]);

  return {
    connectWallet,
    submitScore,
    loadGlobalRecord,
    globalRecord,
    isConnected,
    playerAddress,
    isSubmitting,
    lastTxHash,
    error,
  };
}
```

---

## PART 4 — Wire Into the Game (Boris / Level Devil)

### 4A. Where to Call `submitScore`

In your `BorisGame.jsx` / `BorisGame.tsx`, inside the `levelComplete()` function:

```typescript
// In levelComplete():
const levelComplete = async () => {
  // ... existing levelComplete code ...

  setGameScreen("levelComplete");

  // 🏆 Submit score on-chain (gasless, non-blocking)
  // Only submit if wallet is connected
  if (isConnected) {
    submitScore({
      score: computedScore,          // e.g. (level * 1000) - (deaths * 100) + coins
      level: currentLevelRef.current + 1,
      deaths: totalDeathsRef.current,
      coins: totalCoinsRef.current,
    }).then((result) => {
      if (result) {
        console.log(`Score saved on-chain: ${result.explorerUrl}`);
      }
    });
    // Non-blocking — don't await, game continues smoothly
  }
};
```

### 4B. Score Formula (example)

```typescript
// Calculate a meaningful score from run stats
function calculateScore(level: number, deaths: number, coins: number): number {
  const levelBonus = level * 1000;
  const deathPenalty = deaths * 50;
  const coinBonus = coins * 10;
  return Math.max(0, levelBonus - deathPenalty + coinBonus);
}
```

### 4C. Show Global Leaderboard in World Map

```typescript
// In your WorldMap component, on mount:
useEffect(() => {
  loadGlobalRecord().then((record) => {
    if (record) {
      console.log(`🌍 World Record: ${record.score} by ${record.holder.slice(0, 8)}...`);
    }
  });
}, []);
```

---

## PART 5 — PRIORITY 2: Staking Contract (Future)

When ready, create `src/staking.cairo` with:

```cairo
// Staking contract stores:
// - How much STRK each player has staked
// - When they staked (for lockup period)
// - Accumulated rewards
// - Withdrawal eligibility

// starkzap SDK integration uses:
// wallet.tx()
//   .stake(STAKING_POOL_ADDRESS, Amount.parse("10", STRK))
//   .add({ contractAddress: GAME_CONTRACT, entrypoint: "record_stake", calldata: [...] })
//   .send();
// Atomically stakes AND records it in the game contract in one transaction.
```

---

## PART 6 — Gasless: Which Option to Use

| Situation | Recommended Option | Why |
|---|---|---|
| Game with social login (Google/Twitter) | **Cartridge Controller** | Built-in paymaster, zero config, users never see gas |
| Server-side / backend score submission | **AVNU Paymaster + private key** | No popup needed, you control the key |
| You want players to pay their own gas | Neither — use `feeMode: "user_pays"` | Player pays in STRK |
| Budget concerns | Apply for **Starknet Propulsion Program** | Up to $1M in gas subsidies |

### Cartridge (gasless, zero setup):
```typescript
// All submit_score calls are automatically free for the player
const sdk = new StarkZap({ network: "mainnet" });
const onboard = await sdk.onboard({
  strategy: OnboardStrategy.Cartridge,
  cartridge: { policies: CARTRIDGE_POLICIES },
  deploy: "if_needed",
});
```

### AVNU Paymaster (gasless, you pay):
```typescript
const sdk = new StarkZap({
  network: "mainnet",
  paymaster: {
    nodeUrl: "https://starknet.paymaster.avnu.fi",
    apiKey: process.env.AVNU_API_KEY,
  },
});
// Then: wallet.execute([call], { feeMode: "sponsored" })
```

---

## PART 7 — File Structure

```
your-game/
├── contracts/
│   ├── Scarb.toml
│   └── src/
│       └── lib.cairo                  ← HighScore Cairo contract
├── src/
│   ├── starkzap/
│   │   ├── config.ts                  ← Contract address, network, policies
│   │   ├── wallet.ts                  ← Cartridge connect
│   │   └── scores.ts                  ← submit / read functions
│   ├── hooks/
│   │   └── useOnChainScores.ts        ← React hook for game integration
│   └── components/
│       └── BorisGame.tsx              ← Wire submitScore into levelComplete()
├── .env                               ← DEPLOYER keys (never commit)
└── package.json
```

---

## PART 8 — Testnet Checklist

```bash
# 1. Get Sepolia STRK for gas (deployer only needs this)
#    https://starknet-faucet.vercel.app/

# 2. Build contract
scarb build

# 3. Declare + Deploy (see Part 2B)
sncast declare ...
sncast deploy ...

# 4. Copy deployed contract address into src/starkzap/config.ts

# 5. Test a score submission in the browser
#    Open game → connect wallet (Cartridge) → complete a level → score appears on-chain

# 6. Verify on Starkscan (Sepolia explorer)
#    https://sepolia.starkscan.co/contract/0xYOUR_CONTRACT_ADDRESS
```

---

## Key References

| Resource | URL |
|---|---|
| StarkZap GitHub | https://github.com/keep-starknet-strange/starkzap |
| StarkZap Docs | https://docs.starknet.io/build/starkzap/overview |
| Transactions (execute/preflight) | https://docs.starknet.io/build/starkzap/transactions |
| Paymasters (gasless) | https://docs.starknet.io/build/starkzap/paymasters |
| Cartridge Integration | https://docs.starknet.io/build/starkzap/integrations/cartridge-controller |
| AVNU Portal (API key) | https://portal.avnu.fi |
| Propulsion Program ($1M subsidy) | https://docs.avnu.fi/docs/paymaster/propulsion-program |
| Starknet Quickstart (Cairo) | https://docs.starknet.io/build/quickstart/overview |
| Sepolia Faucet | https://starknet-faucet.vercel.app/ |
| Sepolia Explorer | https://sepolia.starkscan.co |

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `popup blocked` | Browser blocked Cartridge login | Guide user to allow popups for your domain |
| `account not deployed` | First-time wallet | Pass `deploy: "if_needed"` to `sdk.onboard()` |
| `preflight failed` | Contract call would revert | Log `preflight.reason`, check calldata encoding |
| `insufficient balance` | Deployer has no STRK | Get from https://starknet-faucet.vercel.app/ |
| `class hash not found` | Declare not confirmed yet | Wait 30s, retry deploy — Sepolia is slow sometimes |
| `score not updated on read` | Submitted score lower than best | Expected — contract only stores personal bests |
| `TypeScript type error on calldata` | Cairo u64/u8/u32 need string encoding | Always `.toString()` numbers before passing as calldata |
