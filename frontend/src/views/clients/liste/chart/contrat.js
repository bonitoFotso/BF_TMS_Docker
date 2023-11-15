import React from 'react';
import ApexCharts from 'react-apexcharts';

const ContractChart = ({ contractedClients, nonContractedClients }) => {
  try {
    const isEmpty = contractedClients === null && nonContractedClients === null;

    const chartOptions = {
      labels: ['Clients sous contrat', 'Clients non sous contrat'],
      chart: {
        type: 'donut',
        height: '100%', // Ajuste la hauteur du donut à 100%
        toolbar: {
          show: true,
        },
        plotOptions: {
          pie: {
            size: '80%', // Ajuste la taille du donut
          },
        },
      },
      legend: {
        position: 'bottom', // Positionne la légende en dessous du graphique
      },
    };

    const emptyChartOptions = {
      labels: [''],
      chart: {
        type: 'donut',
        height: '100%',
        toolbar: {
          show: false,
        },
        plotOptions: {
          pie: {
            size: '80%',
          },
        },
      },
      legend: {
        position: 'bottom',
      },
    };

    const getChartOptions = (labels) => ({
      labels: [labels],
      chart: {
        type: 'donut',
        height: '100%',
        toolbar: {
          show: false,
        },
        plotOptions: {
          pie: {
            size: '80%',
          },
        },
      },
      legend: {
        position: 'bottom',
      },
    });

    const chartStyle = {
      width: '100%',
      height: '100%',
    };

    return (
      <div>
        <ApexCharts
          options={isEmpty ? emptyChartOptions : chartOptions}
          series={isEmpty ? [0] : [contractedClients, nonContractedClients]}
          type="donut"
          style={chartStyle}
        />
      </div>
    );
  } catch (error) {
    console.error("Erreur dans ContractChart :", error.message);

    return (
      <div>
        <h2>Erreur</h2>
        <p>Une erreur s'est produite lors de l'affichage du graphique.</p>
      </div>
    );
  }
};

export default ContractChart;
