import PropTypes from 'prop-types';
import React from 'react';
import { Paper, Typography } from '@mui/material';

const CountsComponent = ({ agenceCount, appelantCount }) => {
  return (
    <div>
      <Paper elevation={3}>
        <Typography variant="h6">Nombre d Agences : {agenceCount}</Typography>
      </Paper>
      <Paper elevation={3}>
        <Typography variant="h6">Nombre d Appelants : {appelantCount}</Typography>
      </Paper>
    </div>
  );
};

CountsComponent.propTypes = {
  agenceCount: PropTypes.any,
  appelantCount: PropTypes.any
};

export default CountsComponent;
