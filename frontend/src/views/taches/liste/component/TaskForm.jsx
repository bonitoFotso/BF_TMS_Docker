import PropTypes from 'prop-types';
import React from 'react';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DateTimeField from './DateTimeField';
import SelectField from 'components/SelectField/SelectField';

// Composant réutilisable pour les champs de texte
const InputField = ({ label, name, value, onChange, error, helperText, type = 'text' }) => (
   <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <TextField
         id={name}
         name={name}
         type={type}
         value={value}
         onChange={onChange}
         error={error && Boolean(error)}
         helperText={error && helperText}
         variant="outlined"
      />
   </FormControl>
);

InputField.propTypes = {
   error: PropTypes.func,
   helperText: PropTypes.any,
   label: PropTypes.any,
   name: PropTypes.any,
   onChange: PropTypes.any,
   type: PropTypes.string,
   value: PropTypes.any
};

const TaskForm = ({ onSubmit, onCancel, all }) => {
   const validationSchema = yup.object({
      nom: yup.string().required('Le nom de la tâche est requis'),
      status: yup.string().required('Le statut de la tâche est requis'),
      appelant: yup.string().required("L'appelant est requis"),
      priorite: yup.string().required('La priorité de la tâche est requise'),
      description: yup.string().required('La description de la tâche est requise'),
      n_OS: yup.string(),
      date_debut: yup.date(),
      date_fin: yup.date(),
      activite: yup.array().of(yup.number()).required('Au moins une activité est requise'),
      categorie: yup.array().of(yup.number()).required('Au moins une catégorie est requise'),
      assignations: yup.array().of(yup.number()).required('Au moins un technicien est requis')
   });

   const formik = useFormik({
      initialValues: {
         nom: '',
         status: 'En attente',
         appelant: '',
         priorite: 'Bas',
         description: '',
         n_OS: '',
         date_debut: null,
         date_fin: null,
         activite: [],
         categorie: [],
         assignations: []
      },
      validationSchema,
      onSubmit: (values) => {
         onSubmit(values);
      }
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <InputField
            label="Nom de la tâche"
            name="nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            error={formik.touched.nom && formik.errors.nom}
            helperText={formik.touched.nom && formik.errors.nom}
         />

         <SelectField
            label="Catégories"
            name="categorie"
            value={formik.values.categorie}
            onChange={formik.handleChange}
            options={all.categories}
            error={formik.touched.categorie && formik.errors.categorie}
            helperText={formik.touched.categorie && formik.errors.categorie}
            multiple
         />

         <SelectField
            label="Activités"
            name="activite"
            value={formik.values.activite}
            onChange={formik.handleChange}
            options={all.activites}
            error={formik.touched.activite && formik.errors.activite}
            helperText={formik.touched.activite && formik.errors.activite}
            multiple
         />

         <SelectField
            label="Appelant"
            name="appelant"
            value={formik.values.appelant}
            onChange={formik.handleChange}
            options={all.appelants}
            error={formik.touched.appelant && formik.errors.appelant}
            helperText={formik.touched.appelant && formik.errors.appelant}
         />

         <FormControl fullWidth>
            <InputLabel id="status-label">Statut</InputLabel>
            <Select
               labelId="status-label"
               id="status"
               onChange={formik.handleChange}
               name="status"
               error={formik.touched.status && Boolean(formik.errors.status)}
               helperText={formik.touched.status && formik.errors.status}
            >
               <MenuItem value="En attente">En attente</MenuItem>
               <MenuItem value="En cours">En cours</MenuItem>
               <MenuItem value="En arrêt">En arrêt</MenuItem>
               <MenuItem value="Effectué">Effectué</MenuItem>
            </Select>
         </FormControl>

         {/* Autres champs réutilisables */}
         <DateTimeField
            label="Date de début"
            name="date_debut"
            value={formik.values.date_debut}
            onChange={formik.handleChange}
            error={formik.touched.date_debut && formik.errors.date_debut}
            helperText={formik.touched.date_debut && formik.errors.date_debut}
         />

         <DateTimeField
            label="Date de fin"
            name="date_fin"
            value={formik.values.date_fin}
            onChange={formik.handleChange}
            error={formik.touched.date_fin && formik.errors.date_fin}
            helperText={formik.touched.date_fin && formik.errors.date_fin}
         />

         <SelectField
            label="Techniciens"
            name="assignations"
            value={formik.values.assignations}
            onChange={formik.handleChange}
            options={all.techniciens}
            error={formik.touched.assignations && formik.errors.assignations}
            helperText={formik.touched.assignations && formik.errors.assignations}
            multiple
         />

         <InputField
            label="n_OS"
            name="n_OS"
            value={formik.values.n_OS}
            onChange={formik.handleChange}
            error={formik.touched.n_OS && formik.errors.n_OS}
            helperText={formik.touched.n_OS && formik.errors.n_OS}
         />

         {/* Boutons d'action */}
         <Button onClick={onCancel}>Annuler</Button>
         <Button type="submit" variant="contained" color="primary">
            Soumettre
         </Button>
      </form>
   );
};

TaskForm.propTypes = {
   activities: PropTypes.any,
   all: PropTypes.shape({
      activites: PropTypes.any,
      appelants: PropTypes.any,
      categories: PropTypes.any,
      techniciens: PropTypes.any
   }),
   callers: PropTypes.any,
   categories: PropTypes.any,
   initialData: PropTypes.shape({
      activite: PropTypes.shape({
         map: PropTypes.func
      }),
      appelant: PropTypes.string,
      assignations: PropTypes.shape({
         map: PropTypes.func
      }),
      categorie: PropTypes.shape({
         map: PropTypes.func
      }),
      date_debut: PropTypes.any,
      date_fin: PropTypes.any,
      description: PropTypes.string,
      n_OS: PropTypes.string,
      nom: PropTypes.string,
      priorite: PropTypes.string,
      status: PropTypes.string
   }),
   onCancel: PropTypes.any,
   onSubmit: PropTypes.func,
   technicians: PropTypes.any
};

export default TaskForm;
