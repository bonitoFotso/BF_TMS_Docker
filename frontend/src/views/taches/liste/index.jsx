import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../../conf';
import DataGridComponent from './component/DataGrid';
import LoadingErrorComponent from './LoadingErrorComponent';
import { Card } from '@mui/material';
import CreerTache from './creer';

const TacheList = () => {
  const [all, setAll] = useState({ activites: [], appelants: [], categories: [], techniciens: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTacheData = async () => {
      try {
        const response = await axios.get(`${API_URL}/all/`);
        setAll(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTacheData();
  }, []);

  return (
    <Card>
      <h2>Liste des Tâches</h2>
      <CreerTache all={all} setAll={setAll} />
      <LoadingErrorComponent loading={loading} error={error} />
      <DataGridComponent all={all} />
    </Card>
  );
};

export default TacheList;

