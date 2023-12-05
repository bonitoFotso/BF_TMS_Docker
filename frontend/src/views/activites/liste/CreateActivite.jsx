import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, message, Spin, Alert } from 'antd';
import API_URL from '../../../conf';

const { TextArea } = Input;
const CreateActivite = ({ onActiviteCreated, onOk, onCancel }) => {
   const [newActivite, setNewActivite] = useState({
      nom: '',
      description: ''
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewActivite({
         ...newActivite,
         [name]: value
      });
   };

   const resetForm = () => {
      setNewActivite({
         nom: '',
         description: ''
      });
   };

   const onC = () => {
      onCancel();
      resetForm();
   };

   const handleCreateActivite = async () => {
      try {
         setLoading(true);
         setError(null);

         const response = await axios.post(`${API_URL}/activites/`, newActivite);
         onActiviteCreated(response.data);
         onOk();

         message.success('Activité créée avec succès!');
         resetForm();
      } catch (error) {
         console.error("Erreur lors de la création de l'activité :", error);
         setError('Erreur lors de la création de l activité');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <h2>Créer une Activité</h2>
         {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
         <div>
            <Input
               name="nom"
               placeholder="Nom de l'activité"
               value={newActivite.nom}
               onChange={handleInputChange}
               style={{ marginBottom: '16px' }}
            />
            <TextArea
               name="description"
               placeholder="Description de l'activité"
               value={newActivite.description}
               onChange={handleInputChange}
               rows={4}
               style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleCreateActivite} loading={loading} style={{ marginRight: '8px' }}>
               {loading ? <Spin /> : 'Créer'}
            </Button>
            <Button type="default" onClick={onC} disabled={loading}>
               Annuler
            </Button>
         </div>
      </div>
   );
};

CreateActivite.propTypes = {
   onActiviteCreated: PropTypes.func,
   onOk: PropTypes.func,
   onCancel: PropTypes.func
};

export default CreateActivite;
