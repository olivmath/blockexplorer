import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';
import WalletComponent from './wallet';
import TransactionComponent from './transaction';
import BlockComponent from './block';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState('');
  const [input, setInput] = useState({ data: 0, type: 'unknow' });

  useEffect(() => {
    async function getBlockNumber() {
      try {
        const blockNum = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNum);
      } catch (error) {
        alert('Erro ao buscar o número do bloco, detalhes no console')
        console.error(error);
      }
    }

    getBlockNumber();
  }, [alchemy]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      validateInput(text);
    } catch (error) {
      alert('Falha ao colar da área de transferência, detalhes no console');
      console.error(error);
    }
  };
  
  const handleSearch = () => {
    console.log(input)
  };

  const validateInput = (data) => {
    if (data.startsWith('0x')) {
      if (data.length === 42) {
        setInput({ data, type: "address" })
      } else {
        setInput({ data, type: "tx" })
      }
    } else {
      setInput({ data: parseInt(data), type: "block" })
    }
    
  }

  return (
    <div style={{ maxWidth: '100%', padding: '20px' }}>
      <div style={{
        margin: '0 auto',
        maxWidth: '500px',
        border: '1px solid black',
        padding: '20px',
        borderRadius: '5px',
        marginTop: '50px'
      }}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div>Current Ethreum mainnet block number:</div>
          <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
            {blockNumber || 'Loading...'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={input.data || ''}
            onChange={(e) => validateInput(e.target.value)}
            placeholder="Put: tx hash, block number or wallet address"
            style={{ flexGrow: 1, marginRight: '10px', padding: '10px' }}
          />
          <button onClick={handlePaste} style={{ background: 'none', border: 'none', padding: '0', margin: '0 10px' }}>
            <img src="paste.png" alt="Paste" style={{ width: '32px', height: '32px' }} />
          </button>
          <button onClick={handleSearch} style={{ padding: '10px 15px' }}>Search</button>
        </div>
      </div>

      {/* {input.type === 'tx' && <TransactionComponent alchemy={alchemy} hash={input.data} />} */}
      {/* {input.type === 'address' && <WalletComponent alchemy={alchemy} address={input.data} />} */}
      {/* {input.type === 'block' && <BlockComponent alchemy={alchemy} number={input.data} />} */}
    </div>
  );
}


export default App;
