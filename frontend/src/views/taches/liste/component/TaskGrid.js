// TaskGrid.js
import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const TaskGrid = ({ tasks, handleEditClick }) => {
  // ... (rest of the code for TaskGrid component)
  const renderActivite = (params) => (
    <span>{params.row.activite.map((act) => (
        <div key={act.id}>{act.nom}</div>
      ))}</span>
  );

  const renderCategorie = (params) => (
    <span>{params.row.categorie.map((cat) => (
        <div key={cat.id}>{cat.nom}</div>
      ))}</span>
  );

  const renderAppelant = (params) => (
    <span>{params.row.appelant.name}</span>
  );
  const rendertechnicien = (params) => (
    <span>{params.row.assignations.map((tec) => tec.nom).join(', ')}</span>
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nom', headerName: 'Nom', flex: 4 },
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
    {
        field: 'assignations',
        headerName: 'Techniciens',
        flex: 2,
        renderCell: rendertechnicien,
      },
    {
      field: 'edit',
      headerName: 'Modifier',
      flex: 2,
      renderCell: (params) => (
        <button onClick={() => handleEditClick(params.row)}>Modifier</button>
      ),
    },
  ];

  return <DataGrid rows={tasks} columns={columns} pageSize={10} slots={{ toolbar: GridToolbar }} />;
};

export default TaskGrid;
