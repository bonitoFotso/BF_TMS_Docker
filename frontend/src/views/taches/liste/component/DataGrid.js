// DataGridComponent.js
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal } from 'antd';
import EditTaskForm from './EditTaskForm';
import TaskGrid from './TaskGrid';

const DataGridComponent = ({ all, tasks, fetchTask }) => {
   const [selectedTask, setSelectedTask] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleEditClick = (task) => {
      setSelectedTask(task);
      setIsModalOpen(true);
      console.log('open', task);
   };

   const handleCloseModal = () => {
      setSelectedTask(null);
      setIsModalOpen(false);
      console.log('close', selectedTask);
   };

   const onSubmit = (updatedTache) => {
      //((prevTache) => prevTache.map((t) => (t.id === updatedTache.id ? updatedTache : t)));
      fetchTask();
      handleCloseModal();
      setSelectedTask(null);
      console.log('submit', updatedTache);
   };

   return (
      <div style={{ height: 400, width: '100%' }}>
         <TaskGrid tasks={tasks} handleEditClick={handleEditClick} />
         <Modal title="Modifier la tâche" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={500}>
            {selectedTask && <EditTaskForm initialValues={selectedTask} onSubmit={onSubmit} onCancel={handleCloseModal} all={all} />}
         </Modal>
      </div>
   );
};

DataGridComponent.propTypes = {
   all: PropTypes.any,
   fetchTache: PropTypes.func,
   fetchTask: PropTypes.func,
   tasks: PropTypes.any
};

export default DataGridComponent;
