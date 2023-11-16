import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Container, Grid, Paper, Typography } from '@mui/material';

const AgencesAddressChart = ({ agencesByAddress }) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">Répartition des Agences par Adresse</Typography>
      <ApexCharts
        options={{
          xaxis: {
            categories: agencesByAddress.map((item) => item.address),
          },
        }}
        series={[
          {
            name: 'Agences',
            data: agencesByAddress.map((item) => item.count),
          },
        ]}
        type="bar"
        width="100%"
        height={300}
      />
    </Paper>
  );
};

export default AgencesAddressChart;
