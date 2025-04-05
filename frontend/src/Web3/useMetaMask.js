// hooks/useMetaMask.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';

export function useMetaMask() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setWeb3(new Web3(window.ethereum));
                setIsConnected(true);
            } catch (err) {
                console.error('Connection error:', err);
            }
        } else {
            alert('Please install MetaMask');
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts[0] || '');
                setIsConnected(accounts.length > 0);
            });
        }
        return () => {
            window.ethereum?.removeListener('accountsChanged', () => { });
        };
    }, []);

    return {
        web3,
        account,
        isConnected,
        connectWallet,
    };
}