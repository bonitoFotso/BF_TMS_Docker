import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TacheForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        // Utilisez Axios pour soumettre les données modifiées
        axios.put(`${API_URL}/taches/${initialValues.id}`, values)
          .then(response => {
            // Gérez la réponse réussie
            console.log('Tâche mise à jour avec succès:', response.data);
            onSubmit(response.data);
          })
          .catch(error => {
            // Gérez les erreurs
            console.error('Erreur lors de la mise à jour de la tâche :', error);
          });
      })
      .catch(error => {
        console.error('Validation failed:', error);
      });
  };

  return (
    <Form form={form} initialValues={initialValues} layout="vertical">
      <Form.Item label="Nom" name="nom" rules={[{ required: true, message: 'Veuillez saisir le nom!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Statut" name="status" rules={[{ required: true, message: 'Veuillez sélectionner le statut!' }]}>
        <Select>
          <Option value="En attente">En attente</Option>
          <Option value="En cours">En cours</Option>
          <Option value="En arrêt">En arrêt</Option>
          <Option value="Effectué">Effectué</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Priorité" name="priorite" rules={[{ required: true, message: 'Veuillez sélectionner la priorité!' }]}>
        <Select>
          <Option value="Bas">Bas</Option>
          <Option value="Moyen">Moyen</Option>
          <Option value="Élevé">Élevé</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Numéro d'OS" name="n_OS">
        <Input />
      </Form.Item>
      <Form.Item label="Date de début" name="date_debut">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Date de fin" name="date_fin">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Enregistrer
        </Button>
        <Button onClick={onCancel}>Annuler</Button>
      </Form.Item>
    </Form>
  );
};

export default TacheForm;
