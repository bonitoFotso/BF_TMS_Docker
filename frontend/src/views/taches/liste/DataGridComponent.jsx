import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Modal, Form, Input, Select, DatePicker, Button, DatePickerProps, Space } from 'antd';

import API_URL from 'conf';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const { Option } = Select;

const DataGridComponent = ({all}) => {
  const [tache, setTache] = useState([]);
  const [selectedTache, setSelectedTache] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTacheData = async () => {
      try {
        const response = await axios.get(`${API_URL}/taches/`);
        setTache(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    };

    fetchTacheData();
  }, []);

  const handleEditClick = (tache) => {
    setSelectedTache(tache);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTache(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (updatedTache) => {
    // Mettez à jour la tâche dans l'état local ou effectuez d'autres actions nécessaires
    setTache((prevTache) =>
      prevTache.map((t) => (t.id === updatedTache.id ? updatedTache : t))
    );

    // Fermez le modal
    handleCloseModal();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Utilisez Axios pour soumettre les données modifiées
        axios
          .put(`${API_URL}/taches/${selectedTache.id}`, values)
          .then((response) => {
            // Gérez la réponse réussie
            console.log('Tâche mise à jour avec succès:', response.data);
            onSubmit(response.data);
          })
          .catch((error) => {
            // Gérez les erreurs
            console.error('Erreur lors de la mise à jour de la tâche :', error);
          });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const renderActivite = (params) => (
    <span>{params.row.activite.map((act) => act.nom).join(', ')}</span>
  );

  const renderCategorie = (params) => (
    <span>{params.row.categorie.map((cat) => cat.nom).join(', ')}</span>
  );

  const renderAppelant = (params) => (
    <span>{params.row.appelant.name}</span>
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nom', headerName: 'Nom', flex: 2 },
    { field: 'status', headerName: 'Statut', flex: 2 },
    { field: 'priorite', headerName: 'Priorité', flex: 2 },
    {
      field: 'activite',
      headerName: 'Activité',
      flex: 2,
      renderCell: renderActivite,
    },
    {
      field: 'categorie',
      headerName: 'Catégorie',
      flex: 2,
      renderCell: renderCategorie,
    },
    {
      field: 'appelant',
      headerName: 'Appelant',
      flex: 2,
      renderCell: renderAppelant,
    },
    {
      field: 'edit',
      headerName: 'Modifier',
      flex: 2,
      renderCell: (params) => (
        <button onClick={() => handleEditClick(params.row)}>Modifier</button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={tache} columns={columns} pageSize={10} slots={{ toolbar: GridToolbar }} />
      <Modal title="Modifier la tâche" open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedTache && (
          <Form form={form} initialValues={selectedTache}>
            {/* Inclure les champs de formulaire nécessaires pour la modification */}
            <Form.Item label="Activite" name="activite" rules={[{ required: true, message: 'Veuillez sélectionner l activite!' }]}>
              <Select>
                {all.activites.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.nom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Categorie" name="categorie" rules={[{ required: true, message: 'Veuillez sélectionner l Categorie!' }]}>
              <Select>
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
              <Button onClick={handleCancel}>Annuler</Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default DataGridComponent;
