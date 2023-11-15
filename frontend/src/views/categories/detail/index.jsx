import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API_URL from '../../../conf';

const CategorieDetailView = () => {
  const { id } = useParams();
  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCategorie, setUpdatedCategorie] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/${id}/`);
        setCategorie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la catégorie :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCategorieDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedCategorie({ ...categorie });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}/`, updatedCategorie);
      setCategorie(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedCategorie({ ...updatedCategorie, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!categorie) {
    return <div>Aucun détail de catégorie trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails de la Catégorie</h2>
      {isEditing ? (
        <div>
          <TextField name="nom" label="Nom" value={updatedCategorie.nom} onChange={handleFieldChange} />
          <TextField name="description" label="Description" value={updatedCategorie.description} onChange={handleFieldChange} />
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
          <p>Nom : {categorie.nom}</p>
          <p>Description : {categorie.description}</p>
          {/* Affichez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategorieDetailView;
