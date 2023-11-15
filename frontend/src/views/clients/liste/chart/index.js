import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import API_URL from 'conf';
import EvolutionChart from './evolution';
import ContractChart from './contrat';
import AddressChart from './address';
import RepAgences from './rep_agences';

const ClientChart = () => {
  const [data, setData] = useState({
    address_data: [],
    contracted_clients: 0,
    non_contracted_clients: 0,
    monthly_data: [],
    client_agence_data: [],
  });

  const fetchData = () => {
    axios.get(`${API_URL}/clients_data/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  };

  useEffect(() => {
    // Effectuer la première requête au chargement du composant
    fetchData();

    // Planifier des requêtes toutes les 2 minutes (2 * 60 000 millisecondes)
    const intervalId = setInterval(fetchData, 2 * 60 * 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Répartition par adresse</Typography>
            <AddressChart addressData={data.address_data} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Répartition des clients sous contrat</Typography>
            <ContractChart
              contractedClients={data.contracted_clients}
              nonContractedClients={data.non_contracted_clients}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Répartition des agences par client</Typography>
            <RepAgences client_agence={data.client_agence_data} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Évolution du nombre de clients au fil du temps</Typography>
            <EvolutionChart monthlyData={data.monthly_data} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientChart;


