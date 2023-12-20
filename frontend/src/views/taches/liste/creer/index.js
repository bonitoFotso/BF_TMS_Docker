// Importez les icônes nécessaires depuis Ant Design
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import TaskForm from '../component/TaskForm';

const CreerTache = ({ all, setAll, onTaskCreated, fetchTache }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleCreateTaskClick = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   const onSubmit = () => {
      handleCloseModal();
      fetchTache();
   };

   return (
      <div>
         <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTaskClick} style={{ marginBottom: '16px' }}>
            Créer une tâche
         </Button>
         <Modal title="Créer une nouvelle tâche" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={500} zIndex={1149}>
            <TaskForm
               onSubmit={onSubmit}
               onCancel={handleCloseModal}
               all={all}
               setAll={setAll}
               onTaskCreated={onTaskCreated}
               initialData={null}
            />
         </Modal>
      </div>
   );
};

CreerTache.propTypes = {
   all: PropTypes.any,
   fetchTache: PropTypes.func,
   onTaskCreated: PropTypes.any,
   setAll: PropTypes.any
};

export default CreerTache;
