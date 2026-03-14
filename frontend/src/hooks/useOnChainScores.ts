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

  // ── DISCONNECT ────────────────────────────────────────
  const disconnectWallet = useCallback(async () => {
    if (wallet) {
      await wallet.disconnect();
    }
    setWallet(null);
    setSdk(null);
    setIsConnected(false);
    setPlayerAddress("");
    setLastTxHash("");
  }, [wallet]);

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

  // ── LOAD PLAYER BEST ──────────────────────────────────
  const loadPlayerBest = useCallback(async () => {
    if (!playerAddress) return null;
    try {
      const s = sdk ?? (await createCartridgeSDK());
      const best = await fetchPlayerBest(s, playerAddress);
      return best;
    } catch (err: any) {
      setError(`Failed to load player best: ${err.message}`);
      return null;
    }
  }, [sdk, playerAddress]);

  // ── LOAD TOTAL PLAYERS ────────────────────────────────
  const loadTotalPlayers = useCallback(async () => {
    try {
      const s = sdk ?? (await createCartridgeSDK());
      const total = await fetchTotalPlayers(s);
      return total;
    } catch (err: any) {
      setError(`Failed to load total players: ${err.message}`);
      return null;
    }
  }, [sdk]);

  return {
    connectWallet,
    disconnectWallet,
    submitScore,
    loadGlobalRecord,
    loadPlayerBest,
    loadTotalPlayers,
    globalRecord,
    isConnected,
    playerAddress,
    isSubmitting,
    lastTxHash,
    error,
  };
}
