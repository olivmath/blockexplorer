import React, { useState, useEffect } from 'react';

function BlockCard({ alchemy, number }) {
  const [block, setblock] = useState(null);

  useEffect(() => {
    async function getBlockByNumber(blockNumber) {
      let response
      try {
        response = await alchemy.core.getBlock(blockNumber);
      } catch (error) {
        alert('Erro ao buscar o número do bloco, detalhes no console');
        console.error(error);
      }
      const blockData = {
        number: blockNumber,
        hash: response.hash,
        difficulty: response.difficulty,
        txCount: response.transactions.length,
        date: new Date(response.timestamp * 1000).toLocaleString(),
      }
      setblock(blockData);
      console.log(blockData)
    }

    if (number) {
      getBlockByNumber(parseInt(number));
    }

  }, [number, alchemy]);

  if (!block) {
    return (
      <div className="block-card">
        <h2>Carregando dados do Bloco...</h2>
      </div>
    )
  } else {
    return (
      <div className="block-card">
        <h2>Block Number: {block.number}</h2>
        <p>Hash Block: {block.hash}</p>
        <p>Difficulty: {block.difficulty}</p>
        <p>Transaction Count: {block.txCount}</p>
        <p>date: {block.date}</p>
      </div>
    );
  }
}


export default BlockCard;