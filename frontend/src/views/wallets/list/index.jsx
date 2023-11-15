import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import API_URL from '../../../conf';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    renderCell: (params) => (
      // Utilisez la colonne renderCell pour afficher un lien vers les détails du wallet
      <Link to={`/wallet/${params.value}`}>{params.value}</Link>
    )
  },
  {
    field: 'name',
    headerName: 'Wallets',
    width: 150,
    editable: true
  },
  {
    field: 'wallet_type',
    headerName: 'Wallet Type',
    width: 150,
    editable: true
  },
  {
    field: 'balance',
    headerName: 'Balance',
    type: 'number',
    width: 110,
    editable: true
  }
];

const WalletList = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get(`${API_URL}/wallets/`);
        setWallets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des wallets :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  return (
    <div>
      <h2>Liste des Wallets</h2>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={wallets} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick />
      </Box>
    </div>
  );
};

export default WalletList;
