import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import Tab_client from './tab';
import ClientChart from './chart';

const ClientListCreate = () => {
   return (
      <Grid container spacing={gridSpacing}>
         <Grid item xs={12}>
            <Grid item xs={12}>
               <ClientChart />
            </Grid>
         </Grid>
         <Grid item xs={12}>
            <Tab_client />
         </Grid>
         <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
               <Grid item xs={12} md={4}></Grid>
            </Grid>
         </Grid>
      </Grid>
   );
};

export default ClientListCreate;
