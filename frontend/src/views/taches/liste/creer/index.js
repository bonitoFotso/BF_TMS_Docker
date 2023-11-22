// DataGridComponent.js
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import TaskForm from './TaskForm';

const CreerTache = ({ all, setAll }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = () => {
    handleCloseModal();
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button onClick={handleEditClick} variant="outlined" color="primary">
        Créer une tâche
      </Button>
      <Modal title="Modifier la tâche" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={500}>
        {<TaskForm onSubmit={onSubmit} onCancel={handleCloseModal} all={all} setAll={setAll} />}
      </Modal>
    </div>
  );
};

CreerTache.propTypes = {
  all: PropTypes.any,
  setAll: PropTypes.any
};

export default CreerTache;
