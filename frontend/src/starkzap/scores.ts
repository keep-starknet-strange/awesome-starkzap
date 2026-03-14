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
