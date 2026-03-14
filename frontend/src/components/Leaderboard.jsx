import React, { useEffect, useState } from 'react';
import { formatAddress } from '../starkzap/wallet';

/**
 * Leaderboard Component
 * 
 * Displays global high scores and player's personal best.
 * 
 * Props:
 *   - globalRecord: object - { score, level, deaths, coins, holder }
 *   - playerBest: object | null - { score, level, deaths, coins, timestamp }
 *   - totalPlayers: number - total unique players
 *   - onLoadGlobalRecord: () => Promise<void>
 *   - onLoadPlayerBest: () => Promise<void>
 *   - onLoadTotalPlayers: () => Promise<void>
 *   - isConnected: boolean
 */
export function Leaderboard({ 
  globalRecord, 
  playerBest,
  totalPlayers,
  onLoadGlobalRecord,
  onLoadPlayerBest,
  onLoadTotalPlayers,
  isConnected
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await onLoadGlobalRecord();
        await onLoadTotalPlayers();
        if (isConnected) {
          await onLoadPlayerBest();
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isConnected]);

  if (loading) {
    return (
      <div style={{ 
        padding: '24px', 
        textAlign: 'center',
        color: '#6B7280'
      }}>
        🎮 Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="leaderboard" style={{ 
      padding: '24px',
      backgroundColor: '#F9FAFB',
      borderRadius: '12px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '24px',
        textAlign: 'center',
        color: '#1F2937'
      }}>
        🏆 Leaderboard
      </h2>

      {/* Global Record */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '16px',
        border: '2px solid #FBBF24',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color: '#D97706',
          marginBottom: '8px'
        }}>
          👑 WORLD RECORD
        </div>
        
        {globalRecord && globalRecord.score > 0 ? (
          <div>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#1F2937',
              marginBottom: '8px'
            }}>
              {globalRecord.score.toLocaleString()}
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#6B7280',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <span>📊 Level {globalRecord.level}</span>
              <span>💀 {globalRecord.deaths} deaths</span>
              <span>🪙 {globalRecord.coins} coins</span>
            </div>
            <div style={{ 
              marginTop: '12px',
              fontSize: '12px',
              color: '#9CA3AF'
            }}>
              Holder: {formatAddress(globalRecord.holder)}
            </div>
          </div>
        ) : (
          <div style={{ color: '#6B7280' }}>
            No scores yet. Be the first! 🚀
          </div>
        )}
      </div>

      {/* Player Personal Best */}
      {isConnected && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '2px solid #3B82F6',
        }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#2563EB',
            marginBottom: '8px'
          }}>
            ⭐ YOUR BEST
          </div>
          
          {playerBest && playerBest.score > 0n ? (
            <div>
              <div style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                {Number(playerBest.score).toLocaleString()}
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6B7280',
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <span>📊 Level {playerBest.level}</span>
                <span>💀 {playerBest.deaths} deaths</span>
                <span>🪙 {playerBest.coins} coins</span>
              </div>
            </div>
          ) : (
            <div style={{ color: '#6B7280' }}>
              Play a game to set your first score! 🎮
            </div>
          )}
        </div>
      )}

      {/* Total Players */}
      {totalPlayers !== null && totalPlayers > 0 && (
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6B7280',
          marginTop: '16px'
        }}>
          👥 {totalPlayers.toLocaleString()} {totalPlayers === 1 ? 'player' : 'players'} on the blockchain
        </div>
      )}
    </div>
  );
}
