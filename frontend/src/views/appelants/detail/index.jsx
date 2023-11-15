import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

const AppelantDetail = () => {
  const { id } = useParams();
  const [appelant, setAppelant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAppelant, setUpdatedAppelant] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppelantDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/appelants/${id}`); // Mettez l'URL correcte de votre API Django
        setAppelant(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'appelant :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAppelantDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedAppelant({ ...appelant });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/appelants/${id}`, updatedAppelant); // Mettez l'URL correcte de votre API Django
      setAppelant(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'appelant :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedAppelant({ ...updatedAppelant, [e.target.name]: e.target.value });
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/appelants/${id}`); // Mettez l'URL correcte de votre API Django
      // Rediriger ou effectuer d'autres actions après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'appelant :', error);
      // Gérer les erreurs de suppression de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!appelant) {
    return <div>Aucun détail d'appelant trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails de l'Appelant</h2>
      {isEditing ? (
        <div>
          <TextField name="name" label="Nom de l'appelant" value={updatedAppelant.name} onChange={handleFieldChange} />
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
          <p>Nom de l'appelant : {appelant.name}</p>
          {/* Affichez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
            Supprimer
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppelantDetail;
