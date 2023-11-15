import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; // Importez Axios
import MenuItem from '@mui/material/MenuItem';
import API_URL from '../../../conf';

// eslint-disable-next-line react/prop-types
const WalletForm = ({ onAddWallet }) => {
  const [walletUser, setWalletUser] = useState('');
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('');
  const [users, setUsers] = useState([]); // Pour stocker la liste des utilisateurs
  const [walletTypes, setWalletTypes] = useState([]); // Pour stocker la liste des types de label
  useEffect(() => {
    // Effectuez une requête GET pour récupérer la liste des utilisateurs
    axios
      .get(`${API_URL}/api/users/`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });

    // Effectuez une requête GET pour récupérer la liste des types de label
    axios
      .get(`${API_URL}/api/wallet-types/`)
      .then((response) => {
        console.log(response.data);
        setWalletTypes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des types de label :', error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (walletName.trim() === '' || walletType.trim() === '') {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const newWallet = {
      user: walletUser,
      name: walletName,
      wallet_type: walletType
    };

    try {
      // Effectuez une requête POST vers l'API Django pour créer le portefeuille
      const response = await axios.post(`${API_BASE_URL}/api/wallets/create/`, newWallet);

      // Appelez la fonction de rappel pour ajouter le portefeuille (si nécessaire)
      onAddWallet(response.data);

      // Réinitialisez les champs du formulaire
      setWalletUser('');
      setWalletName('');
      setWalletType('');
    } catch (error) {
      console.error('Erreur lors de la création du portefeuille :', error);
      // Gérez les erreurs de manière appropriée (par exemple, affichez un message d'erreur à l'utilisateur)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="user"
        variant="outlined"
        fullWidth
        select
        value={walletUser}
        onChange={(e) => setWalletUser(e.target.value)}
        required
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.username}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Nom du portefeuille"
        variant="outlined"
        fullWidth
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
        required
      />
      <TextField
        label="Type de portefeuille"
        variant="outlined"
        fullWidth
        select
        value={walletType}
        onChange={(e) => setWalletType(e.target.value)}
        required
      >
        {walletTypes.map((walletType) => (
          <MenuItem key={walletType.wallet_types} value={walletType.wallet_types}>
            {walletType.wallet_name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" type="submit">
        Créer le portefeuille
      </Button>
    </form>
  );
};

export default WalletForm;
