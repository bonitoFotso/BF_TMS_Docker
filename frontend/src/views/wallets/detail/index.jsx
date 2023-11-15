// WalletDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API_URL from '../../../conf';

const WalletDetails = () => {
  const { id } = useParams();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedWallet, setUpdatedWallet] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/wallets/detail/${id}`);
        setWallet(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du wallet :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchWalletDetails();
  }, [id]);
  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedWallet({ ...wallet });
  };
  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/wallets/up/${id}`, updatedWallet);
      setWallet(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du portefeuille :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };
  const handleFieldChange = (e) => {
    setUpdatedWallet({ ...updatedWallet, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!wallet) {
    return <div>Aucun détail de wallet trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails du Portefeuille</h2>
      {isEditing ? (
        <div>
          <TextField name="name" label="Nom du portefeuille" value={updatedWallet.name} onChange={handleFieldChange} />
          <TextField name="wallet_type" label="Type de portefeuille" value={updatedWallet.wallet_type} onChange={handleFieldChange} />
          <TextField name="balance" label="Solde" type="number" value={updatedWallet.balance} onChange={handleFieldChange} />
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Enregistrer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            Annuler
          </Button>
        </div>
      ) : (
        <div>
          <p>Nom du portefeuille : {wallet.name}</p>
          <p>Type de portefeuille : {wallet.wallet_type}</p>
          <p>Solde : {wallet.balance}</p>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletDetails;
