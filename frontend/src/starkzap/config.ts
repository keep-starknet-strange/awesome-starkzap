import { StarkZap, OnboardStrategy } from "starkzap";

// ── DEPLOYED CONTRACT ADDRESS ────────────────────────────
// Replace with your actual deployed address after deployment
// This will be set via environment variable
export const GAME_SCORES_CONTRACT = process.env.REACT_APP_GAME_SCORES_CONTRACT || "0x0";

// ── NETWORK ──────────────────────────────────────────────
// Use "sepolia" for testing, "mainnet" for production
export const NETWORK = (process.env.REACT_APP_STARKNET_NETWORK || "sepolia") as "sepolia" | "mainnet";

// ── RPC URL ─────────────────────────────────────────────
export const RPC_URL = process.env.REACT_APP_RPC_URL || "https://starknet-sepolia.public.blastapi.io/rpc/v0_7";

// ── GASLESS STRATEGY ─────────────────────────────────────
// Cartridge Controller (recommended for games)
//   - Users sign in with Google/Twitter/passkey
//   - ALL transactions auto-sponsored (zero gas for players)
//   - Perfect for game scoring

// ── CARTRIDGE SETUP (gasless gaming) ─────────────────────
export const CARTRIDGE_POLICIES = [
  {
    // Allow the game to submit scores on the player's behalf
    target: GAME_SCORES_CONTRACT,
    method: "submit_score",
  },
  // Add more contract methods here as needed
];

// ── SDK FACTORY (Cartridge path) ──────────────────────────
export async function createCartridgeSDK() {
  const sdk = new StarkZap({ network: NETWORK });
  return sdk;
}

// ── SDK FACTORY (with custom RPC) ─────────────────────────
export async function createCustomSDK() {
  const sdk = new StarkZap({ 
    rpcUrl: RPC_URL,
    // Note: chainId will be auto-detected from RPC
  });
  return sdk;
}
