import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API_URL from '../../../conf';

const ActiviteDetail = () => {
  const { id } = useParams();
  const [activite, setActivite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedActivite, setUpdatedActivite] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiviteDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/activites/${id}/`);
        setActivite(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'activité :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchActiviteDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedActivite({ ...activite });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/activites/${id}/`, updatedActivite);
      setActivite(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité :', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedActivite({ ...updatedActivite, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!activite) {
    return <div>Aucun détail d'activité trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails de l'Activité</h2>
      {isEditing ? (
        <div>
          <TextField name="nom" label="Nom de l'activité" value={updatedActivite.nom} onChange={handleFieldChange} />
          <TextField name="description" label="Description de l'activité" value={updatedActivite.description} onChange={handleFieldChange} />
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Enregistrer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            Annuler
          </Button>
        </div>
      ) : (
        <div>
          <p>Nom de l'activité : {activite.nom}</p>
          <p>Description de l'activité : {activite.description}</p>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiviteDetail;
