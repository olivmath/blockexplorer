import React from 'react';

function SearchBar({ input, setInput, handleSearch }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by Tx hash / Block number / Wallet address"
        className="search-input"
      />
      <button onClick={() => navigator.clipboard.readText().then(text => setInput(text)).catch(error => console.error('Paste error:', error))} className="paste-button">
        <img src="paste.png" alt="Paste" className="paste-icon" />
      </button>
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
}

export default SearchBar;
