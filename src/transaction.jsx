import { ethers } from "ethers";
import React, { useState, useEffect } from 'react';

function TransactionCard({ alchemy, hash }) {
  const [tx, setTx] = useState(null);

  useEffect(() => {
    async function getTx(hash) {
      let response
      try {
        response = await alchemy.core.getTransaction(hash);
      } catch (error) {
        alert('Erro ao buscar o hash da transação, detalhes no console')
        console.error(error);
      }
      const txData = {
        blockHash: response.blockHash,
        hash: response.hash,
        from: response.from,
        value: parseFloat(ethers.formatEther(response.value._hex)),
        blockNumber: response.blockNumber,
        nonce: response.nonce
      }
      setTx(txData);
      console.log(txData)
    }

    if (hash) {
      getTx(hash)
    }
  }, [hash, alchemy]);


  if (!tx) {
    return (
      <div className="transaction-card">
        <h2>Carregando dados da Transação...</h2>
      </div>
    )
  } else {
    return (
      <div className="transaction-card">
        <h2>Tx Hash: {`${tx.hash.substring(0, 6)}...${tx.hash.substring(tx.hash.length - 4)}`}</h2>
        <p>Block Hash: {tx.blockHash}</p>
        <p>From: {tx.from}</p>
        <p>Block Number: {tx.blockNumber}</p>
        <p>Value: {tx.value} ETH</p>
        <p>Nonce: {tx.nonce}</p>
        <a
          href={`https://etherscan.io/tx/${tx.hash}`}
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
export default TransactionCard;