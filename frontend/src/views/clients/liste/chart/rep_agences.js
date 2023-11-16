import React from 'react';
import ApexCharts from 'react-apexcharts';

const RepAgences = ({ client_agence }) => {
  try {
    // Vérifie si les données sont présentes
    if (!client_agence || client_agence.length === 0) {
      throw new Error("Aucune donnée disponible pour le graphique.");
    }

    // Préparez les données pour le donut chart
    const chartData = {
      labels: client_agence.map((item) => item.name),
      series: client_agence.map((item) => item.agence_count),
    };

    const options = {
      labels: chartData.labels,
      legend: {
        position: 'bottom', // Place la légende en bas
      },
      colors: ['#FF4500', '#32CD32', '#008080', '#FFD700', '#9932CC'], // Changez les couleurs selon vos préférences
      chart: {
        type: 'donut',
        height: '100%',
        toolbar: {
          show: true,
        },
        plotOptions: {
          pie: {
            size: '80%', // Ajuste la taille du donut
          },
        },
      },
    };

    return (
      <div>
        <ApexCharts options={options} series={chartData.series} type="donut" width="100%"  />
      </div>
    );
  } catch (error) {
    console.error("Erreur dans RepAgences :", error.message);

    return (
      <div>
        <h2>Erreur</h2>
        <p>Une erreur s'est produite lors de la création du graphique.</p>
      </div>
    );
  }
}

export default RepAgences;
