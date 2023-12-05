import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'; // Importez Link
import API_URL from '../../../conf';
import { Modal, Button } from 'antd';
import CreateCategory from './CreateCategorie';

const CategorieListCreate = () => {
   const [categories, setCategories] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleModalOk = () => {
      // Ajoutez votre logique de traitement pour la création de la nouvelle entité ici
      setIsModalOpen(false);
   };

   const handleModalCancel = () => {
      setIsModalOpen(false);
   };

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

   const updateCategoryList = (newCategory) => {
      console.log('Nouvelle categorie créée :', newCategory);
      setCategories((prevCategories) => [...prevCategories, newCategory]);
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
         renderCell: (params) => <Link to={`/categorie/${params.value}`}>{params.value}</Link>
      },
      { field: 'nom', headerName: 'Nom de la catégorie', width: 200 },
      { field: 'description', headerName: 'Description', width: 400 }
      // Colonne avec le lien vers les détails de la catégorie
   ];

   return (
      <div>
         <h2>Liste des Catégories</h2>
         <Button onClick={showModal}>Nouvelle Activité</Button>
         <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={categories} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick autoHeight />
         </div>
         <div>
            <Modal title="Nouvelle Activité" open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
               <CreateCategory onCategoryCreated={updateCategoryList} onOk={handleModalOk} onCancel={handleModalCancel} />
            </Modal>
         </div>
      </div>
   );
};

export default CategorieListCreate;
