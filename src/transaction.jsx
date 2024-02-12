import { ethers } from "ethers";
import React, { useState, useEffect } from 'react';

function TransactionCard({ alchemy, hash }) {
  const [txData, setTxData] = useState({});

    useEffect(() => {
        async function getTxData(hash) {
          let txData
          try {
            txData = await alchemy.core.getTransaction(hash);
          } catch (error) {
            alert('Erro ao buscar o hash da transação, detalhes no console')
            console.error(error);
          }


        setTxData({
          blockHash: `${txData.blockHash.substring(0, 6)}...${txData.blockHash.substring(txData.blockHash.length - 4)}`,
          hash: `${txData.hash.substring(0, 6)}...${txData.hash.substring(txData.hash.length - 4)}`,
          from: `${txData.from.substring(0, 6)}...${txData.from.substring(txData.from.length - 4)}`,
          value: parseInt(ethers.getBigInt(txData.value._hex)) / 10e18,
          blockNumber: txData.blockNumber,
          nonce: txData.nonce
        });
        }

        getTxData("0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b")
      }, [alchemy]);
    

  return (
    <div className="transaction-card">
      <h2>Tx Hash: {txData.hash}</h2>
      <p>Block Hash: {txData.blockHash}</p>
      <p>From: {txData.from}</p>
      <p>Block Number: {txData.blockNumber}</p>
      <p>Value: {txData.value}</p>
      <p>Nonce: {txData.nonce}</p>
    </div>
  );
}

export default TransactionCard;