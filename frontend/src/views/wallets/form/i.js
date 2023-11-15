import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

const WalletForm = ({ onAddWallet }) => {
  const [walletUser, setWalletUser] = useState('');
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('');
  const [users, setUsers] = useState([]); // Pour stocker la liste des utilisateurs
  const [walletTypes, setWalletTypes] = useState([]); // Pour stocker la liste des types de label

  useEffect(() => {
    // Effectuez une requête GET pour récupérer la liste des utilisateurs
    axios
      .get('http://192.168.44.41:8003/api/users/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });

    // Effectuez une requête GET pour récupérer la liste des types de label
    axios
      .get('http://192.168.44.41:8003/api/wallet-types/')
      .then((response) => {
        setWalletTypes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des types de label :', error);
      });
  }, []); // Le tableau vide signifie que cela ne s'exécutera qu'une fois après le montage initial du composant

  const handleSubmit = async (e) => {
    // ...
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
        {labelTypes.map((labelType) => (
          <MenuItem key={labelType.id} value={labelType.id}>
            {labelType.name}
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
