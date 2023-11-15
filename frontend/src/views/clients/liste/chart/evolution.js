import React from 'react';
import ApexCharts from 'react-apexcharts';

const EvolutionChart = ({ monthlyData }) => {
  try {
    // Vérifier si les données mensuelles sont disponibles
    if (!monthlyData || monthlyData.length === 0) {
      throw new Error("Aucune donnée mensuelle disponible pour le graphique.");
    }

    // Formater les données pour l'axe X (dates)
    const formattedData = monthlyData.map((item) => ({
      x: new Date(item.month).getTime(),
      y: item.client_count,
    }));

    return (
      <ApexCharts
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'MMM yyyy',
            },
          },
          yaxis: {
            title: {
              text: 'Nombre de clients',
            },
          },
          colors: ['#4CAF50'],
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          stroke: {
            curve: 'smooth',
          },
          grid: {
            show: true,
          },
          tooltip: {
            x: {
              format: 'MMM yyyy',
            },
          },
        }}
        series={[
          {
            name: 'Clients',
            data: formattedData,
          },
        ]}
        type="bar"
        width="100%"
        height={300}
      />
    );
  } catch (error) {
    console.error("Erreur dans EvolutionChart :", error.message);

    return (
      <div>
        <h2>Erreur</h2>
        <p>Une erreur s'est produite lors de la création du graphique.</p>
      </div>
    );
  }
};

export default EvolutionChart;
