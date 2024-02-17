import TransactionCard from './Transaction';
import WalletCard from './Wallet';
import BlockCard from './Block';
import React from 'react';


function ResultDisplay({ data, type, alchemy}) {
  switch (type) {
    case 'address':
      return <WalletCard alchemy={alchemy} address={data.data} />;
    case 'tx':
      return <TransactionCard alchemy={alchemy} hash={data.data} />;
    case 'block':
      return <BlockCard alchemy={alchemy} number={data.data} />;
    case 'unknown':
      return <div className="valid-query-message">Please enter a valid query.</div>;
    default:
      return <></>
  }
}

export default ResultDisplay;
