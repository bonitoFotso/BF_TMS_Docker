import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from 'conf'
import { useSelector } from 'react-redux';

const UserData = () => {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useSelector((state) => state.account.user._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/userdata`,{id : id});
        setuser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des wallets :', error);
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s&apos;est produite : {error.message}</div>;
  }

  return (
    user
  );
};

export default UserData;
