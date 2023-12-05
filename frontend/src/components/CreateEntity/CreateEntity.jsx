import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Input, Button, message, Spin, Alert } from 'antd';
import API_URL from 'conf';

const CreateEntity = ({ onCreate, onOk, onCancel, entityName, endpoint }) => {
   const [newEntity, setNewEntity] = useState({
      nom: '',
      description: ''
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEntity({
         ...newEntity,
         [name]: value
      });
   };

   const resetForm = () => {
      setNewEntity({
         nom: '',
         description: ''
      });
   };

   const handleCreateEntity = async () => {
      try {
         setLoading(true);
         setError(null);

         const response = await axios.post(`${API_URL}/${endpoint}/`, newEntity);
         onCreate([response.data]);
         onOk();
         message.success(`${entityName} créé(e) avec succès!`);
         resetForm();
      } catch (error) {
         console.error(`Erreur lors de la création de ${entityName} :`, error);
         setError(`Erreur lors de la création de ${entityName}`);
      } finally {
         setLoading(false);
      }
   };

   const handleCancel = () => {
      onCancel();
      resetForm();
   };

   return (
      <div>
         <h2>Créer une {entityName}</h2>
         {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
         <div>
            <Input
               name="nom"
               placeholder={`Nom de la ${entityName.toLowerCase()}`}
               value={newEntity.nom}
               onChange={handleInputChange}
               style={{ marginBottom: '16px' }}
            />
            <Input
               name="description"
               placeholder={`Description de la ${entityName.toLowerCase()}`}
               value={newEntity.description}
               onChange={handleInputChange}
               style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleCreateEntity} loading={loading} style={{ marginRight: '8px' }}>
               {loading ? <Spin /> : 'Créer'}
            </Button>
            <Button type="default" onClick={handleCancel} disabled={loading}>
               Annuler
            </Button>
         </div>
      </div>
   );
};

CreateEntity.propTypes = {
   onCreate: PropTypes.func,
   onOk: PropTypes.func,
   onCancel: PropTypes.func,
   entityName: PropTypes.string,
   endpoint: PropTypes.string
};

export default CreateEntity;
