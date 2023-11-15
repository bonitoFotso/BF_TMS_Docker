import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../../conf';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'; // Importez Link

const TechnicienListCreate = () => {
  const [techniciens, setTechniciens] = useState([]);
  const [newTechnicien, setNewTechnicien] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechniciens = async () => {
      try {
        const response = await axios.get(`${API_URL}/techniciens/`); // Mettez l'URL correcte de votre API Django
        setTechniciens(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des techniciens :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTechniciens();
  }, []);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedTechniciens = techniciens.map((technicien) =>
      technicien.id === id ? { ...technicien, [name]: value } : technicien
    );
    setTechniciens(updatedTechniciens);
  };

  const handleUpdateTechnicien = async (id) => {
    try {
      const updatedTechnicien = techniciens.find((technicien) => technicien.id === id);
      console.log(updatedTechnicien);
      await axios.put(`${API_URL}/techniciens/${id}/`, updatedTechnicien);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du technicien avec l'ID ${id} :`, error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70,
    renderCell: (params) => (
        <Link to={`/technicien/${params.value}`}>{params.value}</Link>
      ), },
    { field: 'nom', headerName: 'Nom', width: 150, editable: true },
    { field: 'prenom', headerName: 'Prénom', width: 150, editable: true },
    { field: 'tel', headerName: 'Téléphone', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 250, editable: true },
    { field: 'matricule', headerName: 'Matricule', width: 150, editable: true },
    { field: 'vitesse_execution', headerName: 'Vitesse d\'exécution', width: 180, editable: true },
    { field: 'efficacite', headerName: 'Efficacité', width: 150, editable: true },
  ];

  return (
    <div>
      <h2>Liste des Techniciens</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={techniciens}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          onEditCellChangeCommitted={(params) => {
            const id = params.id;
            console.log(id);
            handleUpdateTechnicien(id);
          }}
        />
      </div>
    </div>
  );
};

export default TechnicienListCreate;

