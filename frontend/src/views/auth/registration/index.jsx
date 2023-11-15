import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log('Inscription réussie :', response.data);
      // Gérer la redirection ou d'autres actions après l'inscription réussie
    } catch (error) {
      console.error('Erreur lors de l inscription :', error);
      // Gérer les erreurs d'inscription
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input type="text" name="username" onChange={handleChange} value={formData.username} />
        </div>
        <div>
          <label>Email :</label>
          <input type="email" name="email" onChange={handleChange} value={formData.email} />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Registration;
