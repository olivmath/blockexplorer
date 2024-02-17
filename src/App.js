import React, { useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import SearchBar from './components/SearchBar';
import ResultDisplay from './components/ResultDisplay';
import './App.css';
import Logo from "./Ethereum.svg"

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState({ data: null, type: null });

  const handleSearch = () => {
    let searchType = null
    if (input.startsWith('0x')) {
      if (input.length === 42) {
        searchType = "address";
      } else if (input.length === 66) {
        searchType = "tx";
      }
    } else if (!isNaN(input) && input.trim() !== '') {
      searchType = "block";
    } else {
      searchType = "unknown";
    }

    setData({ data: input, type: searchType });
  }

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src={Logo} alt="Logotipo" className="logo" />
      </div>
      <SearchBar input={input} setInput={setInput} handleSearch={handleSearch} />
      <ResultDisplay
        data={data}
        type={data.type}
        alchemy={alchemy}
      />
    </div>
  );
}

export default App;
