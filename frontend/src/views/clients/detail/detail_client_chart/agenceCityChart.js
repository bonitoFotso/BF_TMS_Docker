import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Container, Grid, Paper, Typography } from '@mui/material';

const AgencesByCityChart = ({ agencesByCity }) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">Répartition des Agences par Ville</Typography>
      <ApexCharts
        options={{
          xaxis: {
            categories: agencesByCity.map((item) => item.city),
          },
        }}
        series={[
          {
            name: 'Agences',
            data: agencesByCity.map((item) => item.count),
          },
        ]}
        type="bar"
        width="100%"
        height={300}
      />
    </Paper>
  );
};

export default AgencesByCityChart;
