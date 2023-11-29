import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, message, Spin } from 'antd';
import API_URL from '../../../conf';

const CreateCategory = ({ onCategoryCreated, onOk, onCancel }) => {
  const [newCategory, setNewCategory] = useState({
    nom: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value
    });
  };

  const resetForm = () => {
    setNewCategory({
      nom: '',
      description: ''
    });
  };

  const onC = () => {
    onCancel();
    resetForm();
  };

  const handleCreateCategory = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${API_URL}/categories/`, newCategory);
      onCategoryCreated(response.data);
      onOk();
      message.success('Catégorie créée avec succès!');
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
      setError('Erreur lors de la création de la catégorie');
      console.log(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Créer une Catégorie</h2>
      <div>
        <Input name="nom" placeholder="Nom de la catégorie" value={newCategory.nom} onChange={handleInputChange} />
        <Input name="description" placeholder="Description de la catégorie" value={newCategory.description} onChange={handleInputChange} />
        <Button type="primary" onClick={handleCreateCategory} loading={loading} style={{ marginRight: '8px' }}>
          {loading ? <Spin /> : 'Créer'}
        </Button>
        <Button type="default" onClick={onC} disabled={loading}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

CreateCategory.propTypes = {
  onCancel: PropTypes.func,
  onCategoryCreated: PropTypes.func,
  onOk: PropTypes.func
};

export default CreateCategory;
