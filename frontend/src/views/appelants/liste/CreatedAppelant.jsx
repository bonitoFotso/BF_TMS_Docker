// CreateAppelant.js
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select, Spin } from 'antd';
import axios from 'axios';
import API_URL from 'conf'; // Remplacez par le chemin correct vers votre fichier de configuration

const { Option } = Select;

const CreateAppelant = ({ onAppelantCreated, onOk, onCancel }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [agences, setAgences] = useState([]);

   useEffect(() => {
      const fetchAgences = async () => {
         try {
            const response = await axios.get(`${API_URL}/agences/`);
            setAgences(response.data);
         } catch (error) {
            console.error('Erreur lors de la récupération des agences :', error);
         }
      };

      fetchAgences();
   }, []);

   const handleCreateAppelant = async () => {
      try {
         setLoading(true);
         const values = await form.validateFields();
         const response = await axios.post(`${API_URL}/appelants/`, values);
         onAppelantCreated(response.data);
         onOk();
         message.success('Appelant créé avec succès!');
         form.resetFields();
      } catch (error) {
         console.error('Erreur lors de la création de l appelant :', error);
         message.error('Erreur lors de la création de l appelant. Veuillez vérifier les informations saisies.');
      } finally {
         setLoading(false);
      }
   };

   const resetForm = () => {
      form.resetFields();
   };

   const handleCancel = () => {
      onCancel();
      resetForm();
   };

   return (
      <div>
         <h2>Créer un Appelant</h2>
         <div>
            <Form form={form} layout="vertical">
               <Form.Item
                  name="name"
                  label="Nom de l'appelant"
                  rules={[{ required: true, message: "Veuillez saisir le nom de l'appelant!" }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item name="agence" label="Agence" rules={[{ required: true, message: "Veuillez sélectionner l'agence!" }]}>
                  <Select>
                     {agences.map((agence) => (
                        <Option key={agence.id} value={agence.id}>
                           {agence.name}
                        </Option>
                     ))}
                  </Select>
               </Form.Item>
               <Button type="primary" onClick={handleCreateAppelant} loading={loading} style={{ marginRight: '8px' }}>
                  {loading ? <Spin /> : 'Créer'}
               </Button>
               <Button type="default" onClick={handleCancel} disabled={loading}>
                  Annuler
               </Button>{' '}
            </Form>
         </div>
      </div>
   );
};

CreateAppelant.propTypes = {
   onAppelantCreated: PropTypes.func,
   onCancel: PropTypes.any,
   onOk: PropTypes.func
};

export default CreateAppelant;
