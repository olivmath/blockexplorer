// WalletComponent.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function WalletComponent({ alchemy, address }) {
    const [walletData, setWalletData] = useState({});

    useEffect(() => {
        async function getWalletBalance(address) {
            try {
                // O método getBalance retorna um BigNumber para a quantidade de wei em uma determinada carteira.
                const balance = await alchemy.core.getBalance(address);
                // Conversão de wei para ether e formatação para string.
                const formattedBalance = ethers.utils.formatEther(balance);
                setWalletData({
                    address: `${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
                    balance: formattedBalance
                });
            } catch (error) {
                alert('Erro ao buscar o saldo da carteira:', error);
            }
        }

        getWalletBalance("0x123abc...def456") // substitua pelo endereço correto
    }, [alchemy, address]);

    return (
        <div className="wallet-component">
            <h2>Wallet Address: {walletData.address}</h2>
            <p>Balance: {walletData.balance} ETH</p>
        </div>
    );
}

export default WalletComponent;
