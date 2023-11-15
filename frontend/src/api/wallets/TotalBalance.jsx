import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_URL from '../../conf';

const TotalBalance = () => {
  const [balance, setTotalBalance] = useState(null);

  // Définissez fetchTotalBalance en utilisant useCallback pour éviter les changements inutiles
  const fetchTotalBalance = useCallback(() => {
    axios
      .get(`${API_URL}/total_balance/`)
      .then((response) => {
        // Mettez à jour l'état avec le solde total
        setTotalBalance(response.data.total_balance);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du solde total :', error);
      });
  }, []); // Ajoutez API_BASE_URL comme dépendance de useCallback

  useEffect(() => {
    // Effectuez la première récupération du solde total au montage du composant
    fetchTotalBalance();

    // Démarrez un minuteur pour effectuer des requêtes périodiques
    const intervalId = setInterval(() => {
      fetchTotalBalance();
    }, 6000000); // Vous pouvez ajuster l'intervalle en millisecondes ici (par exemple, 60000 pour une minute)

    // Nettoyez le minuteur lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchTotalBalance]); // Utilisez fetchTotalBalance comme dépendance de useEffect

  return <span>${balance}</span>;
};

export default TotalBalance;
