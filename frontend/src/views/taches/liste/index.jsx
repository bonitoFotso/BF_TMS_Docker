import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../../conf';
import DataGridComponent from './component/DataGrid';
import LoadingErrorComponent from './LoadingErrorComponent';
import { Card } from '@mui/material';
import CreerTache from './creer';

const TacheList = () => {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTacheData = async () => {
      try {
        const response = await axios.get(`${API_URL}/all/`);
        setAll(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des all :', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTacheData();
    //console.log(all);
  }, []);
  //console.log(all);
  return (
    <Card>
      <h2>Liste des Tâches</h2>
      <CreerTache all={all} />
      <LoadingErrorComponent loading={loading} error={error} />
      <DataGridComponent all={all}  />
    </Card>
  );
};

export default TacheList;
