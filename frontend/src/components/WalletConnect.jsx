import React from 'react';
import { formatAddress } from '../starkzap/wallet';

/**
 * WalletConnect Component
 * 
 * Displays wallet connection button and status.
 * Uses Cartridge Controller for gasless gaming experience.
 * 
 * Props:
 *   - isConnected: boolean - wallet connection status
 *   - playerAddress: string - connected wallet address
 *   - onConnect: () => Promise<void> - function to connect wallet
 *   - onDisconnect: () => Promise<void> - function to disconnect wallet
 *   - error: string - error message if any
 */
export function WalletConnect({ 
  isConnected, 
  playerAddress, 
  onConnect, 
  onDisconnect,
  error 
}) {
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await onConnect();
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <div className="connect-section">
          <button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="connect-button"
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              opacity: isConnecting ? 0.7 : 1,
              transition: 'all 0.2s',
            }}
          >
            {isConnecting ? '🔗 Connecting...' : '🎮 Connect Wallet'}
          </button>
          <p style={{ 
            marginTop: '8px', 
            fontSize: '12px', 
            color: '#6B7280' 
          }}>
            Sign in with Google, Twitter, or passkey
          </p>
        </div>
      ) : (
        <div className="connected-section">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '8px 16px',
            backgroundColor: '#10B981',
            borderRadius: '8px',
            color: 'white'
          }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Connected
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                {formatAddress(playerAddress)}
              </div>
            </div>
            <button 
              onClick={onDisconnect}
              style={{
                marginLeft: 'auto',
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
          borderRadius: '6px',
          fontSize: '14px',
        }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
