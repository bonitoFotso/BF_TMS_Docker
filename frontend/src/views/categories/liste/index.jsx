import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'; // Importez Link
import API_URL from '../../../conf';

const CategorieListCreate = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    nom: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(`${API_URL}/categories/`, newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({
        nom: '',
        description: '',
      });
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90,
        renderCell: (params) => (
            <Link to={`/categorie/${params.value}`}>{params.value}</Link>
          ),
    },
    { field: 'nom', headerName: 'Nom de la catégorie', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    // Colonne avec le lien vers les détails de la catégorie
    
  ];

  return (
    <div>
      <h2>Liste des Catégories</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </div>
      <h2>Créer une Catégorie</h2>
      <div>
        <TextField
          name="nom"
          label="Nom de la catégorie"
          value={newCategory.nom}
          onChange={handleInputChange}
        />
        <TextField
          name="description"
          label="Description de la catégorie"
          value={newCategory.description}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleCreateCategory}>
          Créer
        </Button>
      </div>
    </div>
  );
};

export default CategorieListCreate;
