// WalletComponent.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function WalletComponent({ alchemy, address }) {
    const [walletData, setWalletData] = useState({});

    useEffect(() => {
        async function getWalletBalance(address) {
            let balance
            try {
                balance = await alchemy.core.getBalance(address, "latest");
            } catch (error) {
                alert('Erro ao buscar o saldo da carteira, detalhes no console')
                console.error(error);
            }
            const formattedBalance = ethers.getBigInt(balance.value._hex);
            setWalletData({
                address: `${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
                balance: formattedBalance
            });
        }

        getWalletBalance(address)
    }, [alchemy, address]);

    return (
        <div className="wallet-component">
            <h2>Wallet Address: {walletData.address}</h2>
            <p>Balance: {walletData.balance} ETH</p>
        </div>
    );
}

export default WalletComponent;
