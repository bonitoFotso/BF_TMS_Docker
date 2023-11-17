import PropTypes from 'prop-types';
import React from 'react';
import ApexCharts from 'react-apexcharts';

const AddressChart = ({ addressData }) => {
  return (
    <ApexCharts
      options={{
        xaxis: {
          categories: addressData.map((item) => item.address)
        }
      }}
      series={[
        {
          name: 'Clients',
          data: addressData.map((item) => item.client_count)
        }
      ]}
      type="bar"
      width="100%"
      height={200}
    />
  );
};

AddressChart.propTypes = {
  addressData: PropTypes.shape({
    map: PropTypes.func
  })
};

export default AddressChart;
