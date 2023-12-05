// EditTaskForm.js
import PropTypes from 'prop-types';
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

const EditTaskForm = ({ initialValues, onSubmit, onCancel, all }) => {
   const [form] = Form.useForm();

   console.log(initialValues);

   const handleSubmit = () => {
      form
         .validateFields()
         .then((values) => {
            axios
               .put(`${API_URL}/taches/${initialValues.id}`, values)
               .then((response) => {
                  console.log('Tâche mise à jour avec succès:', response.data);
                  form.resetFields();
                  onSubmit(response.data);
                  console.log(initialValues);
               })
               .catch((error) => {
                  console.error('Erreur lors de la mise à jour de la tâche :', error);
               });
         })
         .catch((error) => {
            console.error('Validation failed:', error);
         });
   };
   return (
      <Form
         form={form}
         initialValues={{
            activite: initialValues.activite.map((act) => act.id),
            categorie: initialValues.categorie.map((cat) => cat.id),
            nom: initialValues.nom,
            status: initialValues.status,
            priorite: initialValues.priorite,
            appelant: initialValues.appelant.id,
            assignations: initialValues.assignations.map((ass) => ass.id),
            description: initialValues.description,
            n_OS: initialValues.n_OS,
            date_debut: initialValues.date_debut ? moment(initialValues.date_debut) : null,
            date_fin: initialValues.date_fin ? moment(initialValues.date_fin) : null
            // ... autres valeurs initiales
         }}
      >
         {/* Inclure les champs de formulaire nécessaires pour la modification */}
         <Form.Item label="Activité" name="activite" rules={[{ required: true, message: 'Veuillez sélectionner l activité!' }]}>
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
         <Form.Item
            label="Technicien"
            name="assignations"
            rules={[{ required: true, message: 'Veuillez sélectionner le ou les technicien(s)!' }]}
         >
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

EditTaskForm.propTypes = {
   all: PropTypes.shape({
      activites: PropTypes.array,
      appelants: PropTypes.array,
      categories: PropTypes.array,
      techniciens: PropTypes.array
      // ... (définissez les autres types d'entités)
   }),
   initialValues: PropTypes.shape({
      activite: PropTypes.array,
      appelant: PropTypes.any, // Ajustez ici pour accepter un tableau au lieu d'un objet
      assignations: PropTypes.array,
      categorie: PropTypes.array,
      date_debut: PropTypes.any,
      date_fin: PropTypes.any,
      description: PropTypes.any,
      id: PropTypes.any,
      n_OS: PropTypes.any,
      nom: PropTypes.any,
      priorite: PropTypes.any,
      status: PropTypes.any,
      techniciens: PropTypes.array
   }),
   onCancel: PropTypes.any,
   onSubmit: PropTypes.func
};

export default EditTaskForm;
