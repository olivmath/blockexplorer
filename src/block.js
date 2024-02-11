import React, { useState, useEffect } from 'react';


function BlockComponent({ alchemy, number }) {
    const [blockData, setBlockData] = useState({});

    useEffect(() => {
        async function getBlockByNumber(number) {
          let block
          try {
            block = await alchemy.core.getBlock(number);
          } catch (error) {
            alert('Erro ao buscar o número do bloco:', error);
          }

        setBlockData({
          number: number,
          hash: `${block.hash.substring(0, 6)}...${block.hash.substring(block.hash.length - 4)}`,
          difficulty: block.difficulty,
          txCount: block.transactions.length,
          timestamp: block.timestamp,
        });
        }

      }, [alchemy]);
    

    return (
        <div className="block-component">
        <h2>Block Number: {blockData.number}</h2>
            <p>Hash Block: {blockData.hash}</p>
            <p>Difficulty: {blockData.difficulty}</p>
            <p>Transaction Count: {blockData.txCount}</p>
            <p>Timestamp: {blockData.timestamp}</p>
        </div>
    );
}

export default BlockComponent;