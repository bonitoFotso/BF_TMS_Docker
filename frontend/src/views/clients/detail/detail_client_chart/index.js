import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography } from '@mui/material';
import API_URL from 'conf';
import AgencesAddressChart from './agenceAddChart';
import AgencesByCityChart from './agenceCityChart';
import CountsComponent from './countDiv';

const ClientDetailChart = ({ id }) => {
   const [clientData, setClientData] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axios
         .get(`${API_URL}/clients_agence/${id}/`) // Remplacez 'clientId' par l'ID du client que vous souhaitez récupérer
         .then((response) => {
            setClientData(response.data);
            console.log(response.data);
            setLoading(false);
         })
         .catch((error) => {
            console.error('Erreur lors de la récupération des données du client :', error);
            setLoading(false);
         });
   }, [id]);

   if (loading) {
      return <div>Chargement en cours...</div>;
   }

   const { agences_by_address, agences_by_city, agence_count, appelant_count } = clientData;

   return (
      <Container>
         <Grid container spacing={3}>
            <Grid item xs={12}>
               <Paper elevation={3}>
                  <Typography variant="h4">Détails du Client</Typography>
                  {/* Affichez les détails du client ici */}
               </Paper>
            </Grid>
            <Grid item xs={12}>
               <AgencesAddressChart agencesByAddress={agences_by_address} />
            </Grid>
            <Grid item xs={12}>
               <AgencesByCityChart agencesByCity={agences_by_city} />
            </Grid>
            <Grid item xs={12}>
               <CountsComponent agenceCount={agence_count} appelantCount={appelant_count} />
            </Grid>
         </Grid>
      </Container>
   );
};

ClientDetailChart.propTypes = {
   id: PropTypes.any
};

export default ClientDetailChart;
