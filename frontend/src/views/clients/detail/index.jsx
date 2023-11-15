import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API_URL from 'conf';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClientDetailChart from './detail_client_chart';

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedClient, setUpdatedClient] = useState({});
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.account.token);
  const [tasks, setTasks] = useState([]);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/clients/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du client :', error);
        setError(error);
        setLoading(false);
      }
    };

    

    //const fetchClientTasks = async () => {
    //  try {
    //    const response = await axios.get(`${API_URL}/clients/${id}/tasks/`, {
    //      headers: {
    //        'Authorization': `Bearer ${token}`
    //      }
    //    });
    //    setTasks(response.data);
    //  } catch (error) {
    //    console.error('Erreur lors de la récupération des tâches du client :', error);
    //  }
    //};

    //const fetchClientInteractions = async () => {
    //  try {
    //    const response = await axios.get(`${API_URL}/clients/${id}/interactions/`, {
    //      headers: {
    //        'Authorization': `Bearer ${token}`
    //      }
    //    });
    //    setInteractions(response.data);
    //  } catch (error) {
    //    console.error('Erreur lors de la récupération des interactions du client :', error);
    //  }
    //};
    
    fetchClientDetails();
    //fetchClientTasks();
    //fetchClientInteractions();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedClient({ ...client });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${API_URL}/clients/${id}/`, updatedClient, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setClient(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client :', error);
      // Gérer les erreurs de mise à jour de manière appropriée (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (e) => {
    setUpdatedClient({ ...updatedClient, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  if (!client) {
    return <div>Aucun détail de client trouvé.</div>;
  }

  return (
    <div>
      <h2>Détails du Client</h2>
      {isEditing ? (
        <div>
          {/* Champs d'édition */}
          <TextField name="name" label="Nom du client" value={updatedClient.name} onChange={handleFieldChange} />
          <TextField name="responsable" label="Responsable" value={updatedClient.responsable} onChange={handleFieldChange} />
          <TextField name="email" label="Email" value={updatedClient.email} onChange={handleFieldChange} />
          <TextField name="phone" label="Téléphone" value={updatedClient.phone} onChange={handleFieldChange} />
          {/* Ajoutez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Enregistrer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            Annuler
          </Button>
        </div>
      ) : (
        <div>
          {/* Affichage des détails */}
          <p>Nom du client : {client.name}</p>
          <p>Responsable : {client.responsable}</p>
          <p>Email : {client.email}</p>
          <p>Téléphone : {client.phone}</p>
          {/* Affichez d'autres champs ici */}
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Éditer
          </Button>
        </div>
      )}

      <h2>Tâches du Client</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name} - État : {task.status}</li>
        ))}
      </ul>

      <h2>Historique des Interactions</h2>
      <ul>
        {interactions.map((interaction) => (
          <li key={interaction.id}>{interaction.description} - Date : {interaction.date}</li>
        ))}
      </ul>
      <ClientDetailChart id = {id}/>
    </div>
  );
};

export default ClientDetail;
