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

// ── GET WALLET DISPLAY NAME ──────────────────────────────
// Formats wallet address for display (truncated)
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
