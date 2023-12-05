import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Form, Input, Select, DatePicker, Modal, Button, Space, Spin, Alert } from 'antd';
//import { PlusOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import API_URL from 'conf';
import CreateActivite from 'views/activites/liste/CreateActivite';
import CreateCategory from 'views/categories/liste/CreateCategorie';
import CreateAppelant from 'views/appelants/liste/CreatedAppelant';

const { Option } = Select;
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const TaskForm = ({ onSubmit, onCancel, all, setAll, onTaskCreated }) => {
   const [form] = Form.useForm();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const showModal = (type) => {
      setIsModalOpen(true);
      setModalType(type);
   };

   const handleModalOk = () => {
      setIsModalOpen(false);
   };

   const handleModalCancel = () => {
      setIsModalOpen(false);
      setModalType(null);
   };

   const addNewEntity = (type, entity) => {
      const updatedEntities = [...all[type], entity];
      setAll((prevAll) => ({
         ...prevAll,
         [type]: updatedEntities
      }));
   };

   const handleSubmit = () => {
      form
         .validateFields()
         .then((values) => {
            setLoading(true);
            setError(null);

            axios
               .post(`${API_URL}/taches-c/`, values)
               .then((response) => {
                  form.resetFields();
                  console.log('Tâche créée avec succès:', response.data);
                  onTaskCreated(response.data);
                  onSubmit();
               })
               .catch((error) => {
                  console.error('Erreur lors de la création de la tâche :', error);
                  setError('Erreur lors de la création de la tâche.');
               })
               .finally(() => {
                  setLoading(false);
               });
         })
         .catch((error) => {
            console.error('Validation failed:', error);
            const { errorFields } = error;
            setError(`Erreur de validation. Veuillez vérifier les champs.`);
            errorFields.forEach((field) => {
               console.error(`Champ ${field.name} a échoué à la validation. Erreurs:`, field.errors);
            });
         });
   };

   return (
      <>
         <Form form={form} layout="vertical">
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
         </Form>
         {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

         <Modal visible={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
            {modalType === 'activites' && (
               <CreateActivite
                  onActiviteCreated={(activite) => addNewEntity('activites', activite)}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
               />
            )}
            {modalType === 'categories' && (
               <CreateCategory
                  onCategoryCreated={(category) => addNewEntity('categories', category)}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
               />
            )}
            {modalType === 'appelants' && (
               <CreateAppelant
                  onAppelantCreated={(appelant) => addNewEntity('appelants', appelant)}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
               />
            )}
         </Modal>

         <Space>
            <Button type="primary" onClick={handleSubmit} icon={<AddIcon />} loading={loading} style={{ marginTop: 16 }}>
               {loading ? 'Enregistrement en cours...' : 'Enregistrer'}
            </Button>
            <Button onClick={onCancel}>Annuler</Button>
         </Space>
         {loading && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
               <Spin />
            </div>
         )}
      </>
   );
};

TaskForm.propTypes = {
   all: PropTypes.shape({
      activites: PropTypes.array,
      appelants: PropTypes.array,
      categories: PropTypes.array,
      techniciens: PropTypes.array // ... (définissez les autres types d'entités)
   }),
   onCancel: PropTypes.func,
   onSubmit: PropTypes.func,
   onTaskCreated: PropTypes.func,
   setAll: PropTypes.func
};

export default TaskForm;
