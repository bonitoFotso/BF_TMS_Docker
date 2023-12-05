import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Import du composant DataGrid
import API_URL from '../../../conf';
import AppelantForm from './CreateAppelant';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
   { field: 'id', headerName: 'ID', width: 100, renderCell: (params) => <Link to={`/appelant/${params.value}`}>{params.value}</Link> },
   { field: 'name', headerName: "Nom de l'appelant", flex: 1 }
   // Ajoutez d'autres colonnes pour les autres champs de l'appelant ici
];

const AppelantListCreate = () => {
   const [appelants, setAppelants] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

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

   const handleEditClick = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   const onSubmit = () => {
      handleCloseModal();
   };

   const updateAppelantsList = (newAppelant) => {
      console.log('Nouvelle appelant créée :', newAppelant);
      setAppelants((prevAppelants) => [...prevAppelants, newAppelant]);
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
         <Button onClick={handleEditClick} variant="outlined" color="primary">
            Créer un appelant
         </Button>
         <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={appelants} columns={columns} pageSize={10} rowsPerPageOptions={[10, 25, 50]} checkboxSelection />
         </div>
         <Modal title="Creer un appelant" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={500}>
            <AppelantForm onAppelantUpdated={updateAppelantsList} onSubmit={onSubmit} onCancel={handleCloseModal} />
         </Modal>
      </div>
   );
};

export default AppelantListCreate;
