import React from 'react';
import ApexCharts from 'react-apexcharts';

const EvolutionChart = ({ monthlyData }) => {
   try {
      // Vérifier si les données mensuelles sont disponibles
      if (!monthlyData || monthlyData.length === 0) {
         throw new Error('Aucune donnée mensuelle disponible pour le graphique.');
      }

      // Formater les données pour l'axe X (dates)
      const formattedData = monthlyData.map((item) => ({
         x: new Date(item.month).getTime(),
         y: item.client_count
      }));

      return (
         <ApexCharts
            options={{
               chart: {
                  toolbar: {
                     show: true
                  },
                  zoom: {
                     enabled: true
                  }
               },
               responsive: [
                  {
                     breakpoint: 480,
                     options: {
                        legend: {
                           position: 'bottom',
                           offsetX: -10,
                           offsetY: 0
                        }
                     }
                  }
               ],
               xaxis: {
                  type: 'datetime',
                  labels: {
                     format: 'MMM yyyy'
                  }
               },
               legend: {
                  show: true,
                  fontSize: '14px',
                  fontFamily: `'Roboto', sans-serif`,
                  position: 'bottom',
                  offsetX: 20,
                  labels: {
                     useSeriesColors: false
                  },
                  markers: {
                     width: 16,
                     height: 16,
                     radius: 5
                  },
                  itemMargin: {
                     horizontal: 15,
                     vertical: 8
                  }
               },
               yaxis: {
                  title: {
                     text: 'Nombre de clients'
                  }
               },

               colors: ['#4CAF50'],
               dataLabels: {
                  enabled: true
               },
               plotOptions: {
                  bar: {
                     horizontal: false,
                     columnWidth: '50%'
                  }
               },
               stroke: {
                  curve: 'smooth'
               },
               grid: {
                  show: true
               },
               tooltip: {
                  x: {
                     format: 'MMM yyyy'
                  }
               }
            }}
            series={[
               {
                  name: 'Clients',
                  data: formattedData
               }
            ]}
            type="bar"
            width="100%"
            height={300}
         />
      );
   } catch (error) {
      console.error('Erreur dans EvolutionChart :', error.message);

      return (
         <div>
            <h2>Erreur</h2>
            <p>Une erreur s est produite lors de la création du graphique.</p>
         </div>
      );
   }
};

export default EvolutionChart;
