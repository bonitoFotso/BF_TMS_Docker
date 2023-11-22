import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import API_URL from '../../../conf';

const { Option } = Select;

const AppelantForm = ({ appelantId, onAppelantUpdated, onSubmit }) => {
  const [form] = Form.useForm();
  const [agences, setAgences] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Chargez la liste des agences lors du montage du composant
    fetchAgences();
  }, []);

  const fetchAgences = async () => {
    try {
      const response = await axios.get(`${API_URL}/agences/`);
      setAgences(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des agences :', error);
      // Gérez l'erreur comme nécessaire
    }
  };

  const onFinish = async (values) => {
    try {
      setSubmitting(true);

      if (appelantId) {
        // Si appelantId existe, alors il s'agit d'une modification
        const response = await axios.put(`${API_URL}/appelants/${appelantId}/`, values);
        onAppelantUpdated(response.data);
        message.success('Appelant mis à jour avec succès!');
      } else {
        // Sinon, c'est une création
        const response = await axios.post(`${API_URL}/appelants/`, values);
        onAppelantUpdated(response.data);
        message.success('Appelant créé avec succès!');
        form.resetFields();
        onSubmit();
      }
    } catch (error) {
      console.error('Erreur1 lors de la création/modification de l appelant :', error);
      message.error('Erreur2 lors de la création/modification de l appelant');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Nom de l'appelant" rules={[{ required: true, message: 'Veuillez saisir le nom de l appelant' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="agence" label="Agence" rules={[{ required: true, message: 'Veuillez sélectionner l agence' }]}>
        <Select>
          {agences.map((agence) => (
            <Option key={agence.id} value={agence.id}>
              {agence.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          {appelantId ? 'Modifier' : 'Créer'} l appelant
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
          Annuler
        </Button>
      </Form.Item>
    </Form>
  );
};

AppelantForm.propTypes = {
  appelantId: PropTypes.any,
  onAppelantUpdated: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

export default AppelantForm;
