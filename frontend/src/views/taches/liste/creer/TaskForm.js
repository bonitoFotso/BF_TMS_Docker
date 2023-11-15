// EditTaskForm.js
import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import API_URL from 'conf';
import moment from 'moment';
import 'moment/locale/fr'; // Ajoutez cette ligne si vous souhaitez utiliser la localisation française

const { Option } = Select;
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const TaskForm = ({ onSubmit, onCancel, all }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        

        axios
          .post(`${API_URL}/taches-c/`, values)
          .then((response) => {
            form.resetFields();
            console.log('Tâche Creer avec succès:', response.data);
            onSubmit();
          })
          .catch((error) => {
            console.error('Erreur lors de la Creation de la tâche :', error);
          });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  return (
    <Form form={form} 
      >
    {/* Inclure les champs de formulaire nécessaires pour la modification */}
    <Form.Item
  label="Activité"
  name="activite"
  rules={[{ required: true, message: 'Veuillez sélectionner l activité!' }]}
>
  <Select mode="multiple" placeholder="Sélectionnez une ou plusieurs activités">
    {all.activites.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.nom}
      </Option>
    ))}
  </Select>
</Form.Item>


    <Form.Item label="Catégorie" name="categorie" rules={[{ required: true, message: 'Veuillez sélectionner la Catégorie!' }]}>
  <Select mode="multiple">
    {all.categories.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.nom}
      </Option>
    ))}
  </Select>
</Form.Item>

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
    <Form.Item label="Appelant" name="appelant" rules={[{ required: true, message: 'Veuillez sélectionner l appelant!' }]}>
      <Select>
        {all.appelants.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item label="Technicien" name="assignations" rules={[{ required: true, message: 'Veuillez sélectionner le ou les technicien(s)!' }]}>
      <Select mode="multiple">
        {all.techniciens.map((tec) => (
          <Option key={tec.id} value={tec.id}>
            {tec.nom}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item label="Description" name="description">
      <Input.TextArea />
    </Form.Item>
    <Form.Item label="Numéro d'OS" name="n_OS">
      <Input />
    </Form.Item>
    <Form.Item label="Plage de dates" name="plage_dates">
      <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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

export default TaskForm;
