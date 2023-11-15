import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import API_URL from '../../../conf';

const DataGridComponent = ({ tache }) => {
  const renderActivite = (params) => (
    <span>{params.row.activite.map((act) => act.nom).join(', ')}</span>
  );

  const renderCategorie = (params) => (
    <span>{params.row.categorie.map((cat) => cat.nom).join(', ')}</span>
  );

  const renderAppelant = (params) => (
    <span>{params.row.appelant.name}</span>
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nom', headerName: 'Nom', flex: 2 },
    { field: 'status', headerName: 'Statut', flex: 2 },
    { field: 'priorite', headerName: 'Priorité', flex: 2 },
    {
      field: 'activite',
      headerName: 'Activité',
      flex: 2,
      renderCell: renderActivite,
    },
    {
      field: 'categorie',
      headerName: 'Catégorie',
      flex: 2,
      renderCell: renderCategorie,
    },
    {
      field: 'appelant',
      headerName: 'Appelant',
      flex: 2,
      renderCell: renderAppelant,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={tache} columns={columns} pageSize={10} />
    </div>
  );
};

export default DataGridComponent;
