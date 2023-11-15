import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import API_URL from '../../../conf';
import { Link } from 'react-router-dom'; // Importez Link


const ActiviteListCreate = () => {
  const [activites, setActivites] = useState([]);
  const [newActivite, setNewActivite] = useState({
    nom: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get(`${API_URL}/activites/`);
        setActivites(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchActivites();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivite({
      ...newActivite,
      [name]: value,
    });
  };

  const handleCreateActivite = async () => {
    try {
      const response = await axios.post(`${API_URL}/activites/`, newActivite);
      setActivites([...activites, response.data]);
      setNewActivite({
        nom: '',
        description: '',
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'activité :', error);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90,renderCell: (params) => (
        <Link to={`/activite/${params.value}`}>{params.value}</Link>
      ), },
    { field: 'nom', headerName: 'Nom de l\'activité', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
  ];

  return (
    <div>
      <h2>Liste des Activités</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={activites}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </div>
      <h2>Créer une Activité</h2>
      <div>
        <TextField
          name="nom"
          label="Nom de l'activité"
          value={newActivite.nom}
          onChange={handleInputChange}
        />
        <TextField
          name="description"
          label="Description de l'activité"
          value={newActivite.description}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleCreateActivite}>
          Créer
        </Button>
      </div>
    </div>
  );
};

export default ActiviteListCreate;
