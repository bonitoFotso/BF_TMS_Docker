import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WalletList = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //const fetchData = async () => {
    //  try {
    //    const response = await axios.get('http://127.0.0.1:8003/api/wallets/');
    //    setWallets(response.data);
    //    setLoading(false);
    //  } catch (error) {
    //    console.error('Erreur lors de la récupération des wallets :', error);
    //    setError(error);
    //    setLoading(false);
    //  }
    //};

    //fetchData();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s&apos;est produite : {error.message}</div>;
  }

  return (
    <div>
      <h2>Liste des Wallets</h2>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            {wallet.name} - {wallet.wallet_type} - {wallet.balance} $
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletList;
