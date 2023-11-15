import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API_URL from '../../../conf';

const TacheDetail = () => {
  const { id } = useParams();
  const [tache, setTache] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTache, setUpdatedTache] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTacheDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/taches/${id}`);
        setTache(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la tâche :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTacheDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedTache({ ...tache });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/taches/${id}`, updatedTache);
      setTache(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedTache({ ...updatedTache, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!tache) {
    return <div>Aucun détail de tâche trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails de la Tâche</h2>
      {isEditing ? (
        <div>
          <TextField name="activite" label="Activité" value={updatedTache.activite} onChange={handleFieldChange} />
          <TextField name="categorie" label="Catégorie" value={updatedTache.categorie} onChange={handleFieldChange} />
          <TextField name="nom" label="Nom" value={updatedTache.nom} onChange={handleFieldChange} />
          <TextField name="status" label="Statut" value={updatedTache.status} onChange={handleFieldChange} />
          <TextField name="appelant" label="Appelant" value={updatedTache.appelant} onChange={handleFieldChange} />
          <TextField name="priorite" label="Priorité" value={updatedTache.priorite} onChange={handleFieldChange} />
          <TextField name="description" label="Description" value={updatedTache.description} onChange={handleFieldChange} />
          <TextField name="n_OS" label="Numéro d'OS" value={updatedTache.n_OS} onChange={handleFieldChange} />
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
          <p>Activité : {tache.activite}</p>
          <p>Catégorie : {tache.categorie}</p>
          <p>Nom : {tache.nom}</p>
          <p>Statut : {tache.status}</p>
          <p>Appelant : {tache.appelant}</p>
          <p>Priorité : {tache.priorite}</p>
          <p>Description : {tache.description}</p>
          <p>Numéro d'OS : {tache.n_OS}</p>
          {/* Affichez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}
    </div>
  );
};

export default TacheDetail;
