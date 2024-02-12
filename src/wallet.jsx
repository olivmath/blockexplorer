import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function WalletCard({ alchemy, address }) {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        async function getWalletBalance(address) {
            let response
            try {
                response = await alchemy.core.getBalance(address, "latest");
            } catch (error) {
                alert('Erro ao buscar o saldo da carteira, detalhes no console')
                console.error(error);
            }
            const walletData = {
                address: address,
                balance: parseFloat(ethers.formatEther(response._hex))
            }
            setWallet(walletData);
            console.log(walletData);
        }

        getWalletBalance(address)
    }, [address, alchemy]);

    if (!wallet) {
        return (
            <div className="wallet-card">
                <h2>Carregando dados da Wallet...</h2>
            </div>
        )
    } else {
        return (
            <div className="wallet-card">
                <h2>Wallet Address: {`${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`}</h2>
                <p>Balance: {wallet.balance} ETH</p>
                <a
                    href={`https://etherscan.io/address/${wallet.address}`}
                    style={{ color: '#0e78f0' }}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    More details
                </a>
            </div>
        );
    }
}

export default WalletCard;
