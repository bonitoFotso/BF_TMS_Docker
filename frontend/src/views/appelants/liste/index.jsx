import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'; // Import du composant DataGrid
import API_URL from '../../../conf';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nom de l\'appelant', flex: 1 },
  // Ajoutez d'autres colonnes pour les autres champs de l'appelant ici
];

const AppelantListCreate = () => {
  const [appelants, setAppelants] = useState([]);
  const [newAppelant, setNewAppelant] = useState({
    name: '',
    // autres champs de l'appelant
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppelants = async () => {
      try {
        const response = await axios.get(`${API_URL}/appelants/`); // Mettez l'URL correcte de votre API Django
        setAppelants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des appelants :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAppelants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppelant({
      ...newAppelant,
      [name]: value,
    });
  };

  const handleCreateAppelant = async () => {
    try {
      const response = await axios.post(`${API_URL}/appelants/`, newAppelant); // Mettez l'URL correcte de votre API Django
      setAppelants([...appelants, response.data]);
      setNewAppelant({
        name: '',
        // autres champs de l'appelant
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'appelant :', error);
      // Gérer les erreurs de création de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  return (
    <div>
      <h2>Liste des Appelants</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={appelants}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
        />
      </div>
      <h2>Créer un Appelant</h2>
      <div>
        <TextField
          name="name"
          label="Nom de l'appelant"
          value={newAppelant.name}
          onChange={handleInputChange}
        />
        {/* Ajoutez d'autres champs ici */}
        <Button variant="contained" color="primary" onClick={handleCreateAppelant}>
          Créer
        </Button>
      </div>
    </div>
  );
};

export default AppelantListCreate;
