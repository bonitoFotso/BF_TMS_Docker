// DataGridComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import EditTaskForm from './EditTaskForm';
import TaskGrid from './TaskGrid';
import API_URL from 'conf';

const DataGridComponent = ({ all }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`${API_URL}/taches/`);
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  useEffect(() => {
    

    fetchTaskData();
  }, []);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
    console.log('close',selectedTask);
  };

  const onSubmit = () => {
    fetchTaskData();
    handleCloseModal();
    setSelectedTask(null);
    console.log('submit',selectedTask);

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

export default DataGridComponent;
