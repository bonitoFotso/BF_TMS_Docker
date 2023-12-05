import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'; // Importez Link
import API_URL from '../../../conf';

const ActiviteList = () => {
   const [activites, setActivites] = useState([]);
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
         <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={activites} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick autoHeight />
         </div>
      </div>
   );
};

export default ActiviteList;
