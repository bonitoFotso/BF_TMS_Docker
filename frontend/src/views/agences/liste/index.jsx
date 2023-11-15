import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Importez DataGrid depuis la bibliothèque @mui/x-data-grid
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import API_URL from '../../../conf';
import { Link } from 'react-router-dom';

const AgenceListCreate = () => {
  const [agences, setAgences] = useState([]);
  const [newAgence, setNewAgence] = useState({
    name: '',
    responsable: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    n_agence: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const response = await axios.get(`${API_URL}/agences/`); // Mettez l'URL correcte de votre API Django
        setAgences(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des agences :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAgences();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAgence({
      ...newAgence,
      [name]: value,
    });
  };

  const handleCreateAgence = async () => {
    try {
      const response = await axios.post(`${API_URL}/agences/`, newAgence); // Mettez l'URL correcte de votre API Django
      setAgences([...agences, response.data]);
      setNewAgence({
        name: '',
        responsable: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        n_agence: '',
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'agence :', error);
      // Gérer les erreurs de création de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  // Définissez les colonnes du DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100,
    renderCell: (params) => (
        <Link to={`/agence/${params.value}`}>{params.value}</Link>
      ) },
    { field: 'name', headerName: 'Nom de l\'agence', flex: 1 },
    // Ajoutez d'autres colonnes ici
  ];

  return (
    <div>
      <h2>Liste des Agences</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={agences}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          // Ajoutez d'autres fonctionnalités DataGrid ici
        />
      </div>
      <h2>Créer une Agence</h2>
      <div>
        <TextField
          name="name"
          label="Nom de l'agence"
          value={newAgence.name}
          onChange={handleInputChange}
        />
        {/* Ajoutez d'autres champs ici */}
        <Button variant="contained" color="primary" onClick={handleCreateAgence}>
          Créer
        </Button>
      </div>
    </div>
  );
};

export default AgenceListCreate;

