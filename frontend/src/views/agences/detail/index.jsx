import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API_URL from '../../../conf';
import { useParams } from 'react-router-dom';

const AgenceDetail = () => {
  const { id } = useParams();
  const [agence, setAgence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAgence, setUpdatedAgence] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgenceDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/agences/${id}/`);
        setAgence(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'agence :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAgenceDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedAgence({ ...agence });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/agences/${id}/`, updatedAgence);
      setAgence(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'agence :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedAgence({ ...updatedAgence, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!agence) {
    return <div>Aucun détail d'agence trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails de l'Agence</h2>
      {isEditing ? (
        <div>
          <TextField name="name" label="Nom de l'agence" value={updatedAgence.name} onChange={handleFieldChange} />
          {/* Ajoutez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Enregistrer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            Annuler
          </Button>
        </div>
      ) : (
        <div>
          <p>Nom de l'agence : {agence.name}</p>
          {/* Affichez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}
    </div>
  );
};

export default AgenceDetail;
