import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import API_URL from '../../../conf';
import { Link } from 'react-router-dom'; // Importez Link
import CreateActivite from './CreateActivite';
import { Modal, Button } from 'antd';

const ActiviteListCreate = () => {
   const [activites, setActivites] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

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

   const updateActivitesList = (newActivite) => {
      console.log('Nouvelle activité créée :', newActivite);
      setActivites((prevActivites) => [...prevActivites, newActivite]);
   };

   if (loading) {
      return <div>Chargement en cours...</div>;
   }

   if (error) {
      return <div>Une erreur est produite : {error.message}</div>;
   }

   const columns = [
      { field: 'id', headerName: 'ID', width: 90, renderCell: (params) => <Link to={`/activite/${params.value}`}>{params.value}</Link> },
      { field: 'nom', headerName: "Nom de l'activité", width: 200 },
      { field: 'description', headerName: 'Description', width: 400 }
   ];

   return (
      <div>
         <h2>Liste des Activités</h2>
         <Button onClick={showModal}>Nouvelle Activité</Button>
         <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={activites} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick autoHeight />
         </div>
         <Modal title="Nouvelle Activité" open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
            <CreateActivite onActiviteCreated={updateActivitesList} onOk={handleModalOk} onCancel={handleModalCancel} />
         </Modal>
      </div>
   );
};

export default ActiviteListCreate;
