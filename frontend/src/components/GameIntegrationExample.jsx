import React, { useState, useEffect } from 'react';
import { useOnChainScores } from '../hooks/useOnChainScores';
import { WalletConnect } from './WalletConnect';
import { Leaderboard } from './Leaderboard';

/**
 * GameIntegrationExample
 * 
 * Example of how to integrate on-chain scoring into your game.
 * Replace the mock game logic with your actual game.
 */
export function GameIntegrationExample() {
  // On-chain scores hook
  const {
    connectWallet,
    disconnectWallet,
    submitScore,
    loadGlobalRecord,
    loadPlayerBest,
    loadTotalPlayers,
    isConnected,
    playerAddress,
    isSubmitting,
    lastTxHash,
    error,
    globalRecord,
  } = useOnChainScores();

  // Local state for leaderboard
  const [playerBest, setPlayerBest] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(0);

  // Mock game state
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [currentLevel, setCurrentLevel] = useState(1);
  const [deaths, setDeaths] = useState(0);
  const [coins, setCoins] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  // Calculate score based on game stats
  const calculateScore = (level, deaths, coins) => {
    // Example formula: level bonus - death penalty + coin bonus
    return Math.max(0, (level * 1000) - (deaths * 50) + (coins * 10));
  };

  // Handle game completion
  const handleGameComplete = async () => {
    const score = calculateScore(currentLevel, deaths, coins);
    setFinalScore(score);
    setGameState('gameOver');

    // Submit score to blockchain if wallet is connected
    if (isConnected) {
      const result = await submitScore({
        score,
        level: currentLevel,
        deaths,
        coins,
      });

      if (result) {
        console.log('✅ Score saved on-chain!');
        console.log('Transaction:', result.explorerUrl);
        
        // Reload player's best score
        const best = await loadPlayerBest();
        setPlayerBest(best);
      }
    }
  };

  // Load leaderboard data on mount
  useEffect(() => {
    const loadLeaderboard = async () => {
      await loadGlobalRecord();
      const total = await loadTotalPlayers();
      setTotalPlayers(total);
      
      if (isConnected) {
        const best = await loadPlayerBest();
        setPlayerBest(best);
      }
    };
    loadLeaderboard();
  }, [isConnected]);

  // Mock game actions
  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setDeaths(0);
    setCoins(0);
    setFinalScore(0);
  };

  const collectCoin = () => setCoins(prev => prev + 1);
  const playerDied = () => setDeaths(prev => prev + 1);
  const completeLevel = () => setCurrentLevel(prev => prev + 1);

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '32px' 
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          🎮 On-Chain Game Example
        </h1>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          Powered by Starknet • Gasless Scoring
        </p>
      </div>

      {/* Wallet Connection */}
      <div style={{ marginBottom: '32px' }}>
        <WalletConnect
          isConnected={isConnected}
          playerAddress={playerAddress}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          error={error}
        />
      </div>

      {/* Game Area */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Left: Game */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          border: '2px solid #E5E7EB',
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            marginBottom: '16px' 
          }}>
            Game
          </h2>

          {gameState === 'menu' && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ marginBottom: '24px', color: '#6B7280' }}>
                This is a demo game. Your real game logic goes here!
              </p>
              <button
                onClick={startGame}
                style={{
                  padding: '12px 32px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                ▶️ Start Game
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div>
              <div style={{ 
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#F3F4F6',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>📊 Level: {currentLevel}</span>
                  <span>💀 Deaths: {deaths}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>🪙 Coins: {coins}</span>
                  <span>🎯 Score: {calculateScore(currentLevel, deaths, coins)}</span>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <button
                  onClick={collectCoin}
                  style={{
                    padding: '12px',
                    backgroundColor: '#FBBF24',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  🪙 Collect Coin
                </button>
                <button
                  onClick={playerDied}
                  style={{
                    padding: '12px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  💀 Die
                </button>
                <button
                  onClick={completeLevel}
                  style={{
                    padding: '12px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ⬆️ Level Up
                </button>
                <button
                  onClick={handleGameComplete}
                  style={{
                    padding: '12px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  🏁 Finish Game
                </button>
              </div>

              <p style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>
                Click "Finish Game" to submit your score on-chain!
              </p>
            </div>
          )}

          {gameState === 'gameOver' && (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                🎉 Game Over!
              </h3>
              <div style={{ 
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#F3F4F6',
                borderRadius: '8px',
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {finalScore.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  Level {currentLevel} • {deaths} deaths • {coins} coins
                </div>
              </div>

              {isSubmitting && (
                <div style={{ 
                  padding: '12px',
                  backgroundColor: '#DBEAFE',
                  color: '#1E40AF',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  ⏳ Saving score on-chain...
                </div>
              )}

              {lastTxHash && !isSubmitting && (
                <div style={{ 
                  padding: '12px',
                  backgroundColor: '#D1FAE5',
                  color: '#065F46',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  ✅ Score saved on blockchain!
                </div>
              )}

              {!isConnected && (
                <div style={{ 
                  padding: '12px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  ⚠️ Connect wallet to save scores on-chain
                </div>
              )}

              <button
                onClick={startGame}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                🔄 Play Again
              </button>
            </div>
          )}
        </div>

        {/* Right: Stats */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          border: '2px solid #E5E7EB',
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            marginBottom: '16px' 
          }}>
            Score Formula
          </h2>
          <div style={{ 
            padding: '16px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            score = max(0, <br/>
            &nbsp;&nbsp;(level × 1000) <br/>
            &nbsp;&nbsp;- (deaths × 50) <br/>
            &nbsp;&nbsp;+ (coins × 10)<br/>
            )
          </div>

          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            marginBottom: '12px',
            marginTop: '24px'
          }}>
            How it Works
          </h3>
          <ol style={{ 
            fontSize: '14px', 
            color: '#6B7280',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li>Play the game and collect coins</li>
            <li>Click "Finish Game" when done</li>
            <li>Score automatically submitted on-chain (if connected)</li>
            <li>Contract only updates if score beats personal best</li>
            <li>Zero gas fees for players!</li>
          </ol>
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard
        globalRecord={globalRecord}
        playerBest={playerBest}
        totalPlayers={totalPlayers}
        onLoadGlobalRecord={loadGlobalRecord}
        onLoadPlayerBest={async () => {
          const best = await loadPlayerBest();
          setPlayerBest(best);
        }}
        onLoadTotalPlayers={async () => {
          const total = await loadTotalPlayers();
          setTotalPlayers(total);
        }}
        isConnected={isConnected}
      />
    </div>
  );
}
