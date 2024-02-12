import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';
import WalletCard from './wallet';
import TransactionCard from './transaction';
import BlockCard from './block';

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
  const [searched, setSearched] = useState(false);
  const [input, setInput] = useState('');
  const [data, setData] = useState({});

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
      setInput(text)
    } catch (error) {
      alert('Falha ao colar da área de transferência, detalhes no console');
      console.error(error);
    }
  };

  const handleSearch = () => {
    let type = 'unknown';
    if (input.startsWith('0x')) {
      if (input.length === 42) {
        type = "address";
      } else if (input.length === 66) {
        type = "tx";
      }
    } else if (!isNaN(input) && input.trim() !== '') {
      type = "block";
    }

    setData({ data: input, type });
    setSearched(true);
  };

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
            value={input || ''}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Put: tx hash, block number or wallet address"
            style={{ flexGrow: 1, marginRight: '10px', padding: '10px' }}
          />
          <button onClick={handlePaste} style={{ background: 'none', border: 'none', padding: '0', margin: '0 10px' }}>
            <img src="paste.png" alt="Paste" style={{ width: '32px', height: '32px' }} />
          </button>
          <button onClick={handleSearch} style={{ padding: '10px 15px' }}>Search</button>
        </div>
      </div>

      {searched && data.type === 'address' && <WalletCard alchemy={alchemy} address={data.data} />}
      {searched && data.type === 'tx' && <TransactionCard alchemy={alchemy} hash={data.data} />}
      {searched && data.type === 'block' && <BlockCard alchemy={alchemy} number={data.data} />}
    </div>
  );
}


export default App;
