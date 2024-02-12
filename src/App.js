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
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    async function getBlockNumber() {
      try {
        // Certifique-se de que o método getBlockNumber está disponível no objeto alchemy.
        const blockNum = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNum);
      } catch (error) {
        console.error('Erro ao buscar o número do bloco:', error);
        // Trate o erro conforme necessário.
      }
    }

    getBlockNumber();
  }, [alchemy]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      validateInput(text);
    } catch (error) {
      console.error('Falha ao colar da área de transferência:', error);
      // Aqui você pode optar por mostrar uma mensagem ao usuário
      // informando que não foi possível acessar a área de transferência.
    }
  };
  
  const handleSearch = () => {
    console.log('Buscar o hash:', inputData);
  };

  const validateInput = (input) => {
    if (input.startsWith('0x')) {
      console.log("é Um hash:", input);
    } else {
      console.log("é Um número:", parseInt(input))
    }
    setInputData(input)
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
            value={inputData}
            onChange={(e) => validateInput(e.target.value)}
            placeholder="Tx hash or block number"
            style={{ flexGrow: 1, marginRight: '10px', padding: '10px' }}
          />
          <button onClick={handlePaste} style={{ background: 'none', border: 'none', padding: '0', margin: '0 10px' }}>
            <img src="paste.png" alt="Paste" style={{ width: '32px', height: '32px' }} />
          </button>
          <button onClick={handleSearch} style={{ padding: '10px 15px' }}>Search</button>
        </div>
      </div>

      <WalletComponent/>
    </div>
  );
}


export default App;
