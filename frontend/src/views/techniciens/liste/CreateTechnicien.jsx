// CreateTechnicien.js
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import API_URL from 'chemin/vers/votre/fichier/conf'; // Remplacez par le chemin correct vers votre fichier de configuration

const { Option } = Select;

const CreateTechnicien = ({ onTechnicienCreated, onOk, onCancel }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axios.get(`${API_URL}/users/`);
            setUsers(response.data);
         } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
         }
      };

      fetchUsers();
   }, []);

   const handleCreateTechnicien = async () => {
      try {
         setLoading(true);
         const values = await form.validateFields();
         const response = await axios.post(`${API_URL}/techniciens/`, values);
         onTechnicienCreated(response.data);
         onOk();
         message.success('Technicien créé avec succès!');
         form.resetFields();
      } catch (error) {
         console.error('Erreur lors de la création du technicien :', error);
         message.error('Erreur lors de la création du technicien.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         title="Créer un nouveau technicien"
         visible
         onOk={handleCreateTechnicien}
         onCancel={onCancel}
         footer={[
            <Button key="back" onClick={onCancel}>
               Annuler
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleCreateTechnicien}>
               Créer
            </Button>
         ]}
      >
         <Form form={form} layout="vertical">
            <Form.Item name="nom" label="Nom du technicien" rules={[{ required: true, message: 'Veuillez saisir le nom du technicien!' }]}>
               <Input />
            </Form.Item>
            <Form.Item
               name="prenom"
               label="Prénom du technicien"
               rules={[{ required: true, message: 'Veuillez saisir le prénom du technicien!' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="tel"
               label="Téléphone du technicien"
               rules={[{ required: true, message: 'Veuillez saisir le téléphone du technicien!' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="email"
               label="Email du technicien"
               rules={[{ required: true, message: "Veuillez saisir l'email du technicien!" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="matricule"
               label="Matricule du technicien"
               rules={[{ required: true, message: 'Veuillez saisir le matricule du technicien!' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="user"
               label="Utilisateur associé"
               rules={[{ required: true, message: "Veuillez sélectionner l'utilisateur associé!" }]}
            >
               <Select>
                  {users.map((user) => (
                     <Option key={user.id} value={user.id}>
                        {user.username}
                     </Option>
                  ))}
               </Select>
            </Form.Item>
            {/* Ajoutez d'autres champs du modèle Technicien ici */}
         </Form>
      </Modal>
   );
};

CreateTechnicien.propTypes = {
   onTechnicienCreated: PropTypes.func,
   onCancel: PropTypes.any,
   onOk: PropTypes.func
};

export default CreateTechnicien;
