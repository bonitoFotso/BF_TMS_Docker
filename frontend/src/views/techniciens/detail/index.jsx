import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../../conf';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

const TechnicienDetail = () => {
  const [technicien, setTechnicien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTechnicien, setUpdatedTechnicien] = useState({});
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTechnicienDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/techniciens/${id}/`);
        setTechnicien(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du technicien :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTechnicienDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedTechnicien({ ...technicien });
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('nom', updatedTechnicien.nom);
      formData.append('prenom', updatedTechnicien.prenom);
      formData.append('tel', updatedTechnicien.tel);
      formData.append('email', updatedTechnicien.email);
      formData.append('matricule', updatedTechnicien.matricule);

      if (photoFile) {
        // Si un nouveau fichier a été sélectionné, mettez à jour la photo
        formData.append('photo', photoFile);
      } else {
        // Si aucun fichier n'a été sélectionné, conservez l'URL de l'ancienne photo
        formData.append('photo', technicien.photo);
      }

      const response = await axios.put(`${API_URL}/techniciens/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTechnicien(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du technicien :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedTechnicien({ ...updatedTechnicien, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!technicien) {
    return <div>Aucun détail de technicien trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails du Technicien</h2>
      {isEditing ? (
        <div>
          <TextField name="nom" label="Nom" value={updatedTechnicien.nom} onChange={handleFieldChange} />
          <TextField name="prenom" label="Prénom" value={updatedTechnicien.prenom} onChange={handleFieldChange} />
          <TextField name="tel" label="Téléphone" value={updatedTechnicien.tel} onChange={handleFieldChange} />
          <TextField name="email" label="Email" value={updatedTechnicien.email} onChange={handleFieldChange} />
          <TextField name="matricule" label="Matricule" value={updatedTechnicien.matricule} onChange={handleFieldChange} />
          <input type="file" name="photo" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Enregistrer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            Annuler
          </Button>
        </div>
      ) : (
        <div>
          <p>Nom : {technicien.nom}</p>
          <p>Prénom : {technicien.prenom}</p>
          <p>Téléphone : {technicien.tel}</p>
          <p>Email : {technicien.email}</p>
          <p>Matricule : {technicien.matricule}</p>
          <p>Photo : <img src={technicien.photo} alt="Photo du technicien" /></p>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}
    </div>
  );
};

export default TechnicienDetail;
