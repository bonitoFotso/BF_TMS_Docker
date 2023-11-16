// DataGridComponent.js
import React, { useState } from 'react';
import { Modal,Button } from 'antd';
import TaskForm from './TaskForm';

const CreerTache = ({ all }) => {
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
        {<TaskForm onSubmit={onSubmit} onCancel={handleCloseModal} all={all} />}
      </Modal>
    </div>
  );
};

export default CreerTache;
