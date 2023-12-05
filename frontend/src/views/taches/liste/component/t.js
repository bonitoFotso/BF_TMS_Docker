import PropTypes from 'prop-types';
import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const TaskForm = ({ onSubmit, onCancel, all }) => {
   categories = all.categories;
   activities = all.activites;
   technicians = all.techniciens;
   callers = all.appelants;

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
         nom: initialData.nom || '',
         status: initialData.status || 'En attente',
         appelant: initialData.appelant || '',
         priorite: initialData.priorite || 'Bas',
         description: initialData.description || '',
         n_OS: initialData.n_OS || '',
         date_debut: initialData.date_debut || null,
         date_fin: initialData.date_fin || null,
         activite: initialData.activite.map((act) => act.id) || [],
         categorie: initialData.categorie.map((cat) => cat.id) || [],
         assignations: initialData.assignations.map((tech) => tech.id) || []
      },
      validationSchema,
      onSubmit: (values) => {
         onSubmit(values);
      }
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <TextField
            fullWidth
            id="nom"
            name="nom"
            label="Nom de la tâche"
            onChange={formik.handleChange}
            error={formik.touched.nom && Boolean(formik.errors.nom)}
            helperText={formik.touched.nom && formik.errors.nom}
         />
         <FormControl fullWidth>
            <InputLabel id="appelant-label">Appelant</InputLabel>
            <Select
               labelId="appelant-label"
               id="appelant"
               onChange={formik.handleChange}
               name="appelant"
               error={formik.touched.appelant && Boolean(formik.errors.appelant)}
               helperText={formik.touched.appelant && formik.errors.appelant}
            >
               {callers.map((caller) => (
                  <MenuItem key={caller.id} value={caller.id}>
                     {caller.name}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         <FormControl fullWidth>
            <InputLabel id="activite-label">Activités</InputLabel>
            <Select
               labelId="activite-label"
               id="activite"
               multiple
               onChange={formik.handleChange}
               name="activite"
               error={formik.touched.activite && Boolean(formik.errors.activite)}
               helperText={formik.touched.activite && formik.errors.activite}
            >
               {activities.map((activity) => (
                  <MenuItem key={activity.id} value={activity.id}>
                     {activity.nom}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>

         <FormControl fullWidth>
            <InputLabel id="categorie-label">Catégories</InputLabel>
            <Select
               labelId="categorie-label"
               id="categorie"
               multiple
               onChange={formik.handleChange}
               name="categorie"
               error={formik.touched.categorie && Boolean(formik.errors.categorie)}
               helperText={formik.touched.categorie && formik.errors.categorie}
            >
               {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                     {category.nom}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
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

         <FormControl fullWidth>
            <InputLabel id="description-label">Description</InputLabel>
            <TextField
               id="description"
               name="description"
               multiline
               rows={4}
               onChange={formik.handleChange}
               error={formik.touched.description && Boolean(formik.errors.description)}
               helperText={formik.touched.description && formik.errors.description}
            />
         </FormControl>

         <FormControl fullWidth>
            <InputLabel id="assignations-label">Assignations</InputLabel>
            <Select
               labelId="assignations-label"
               id="assignations"
               multiple
               onChange={formik.handleChange}
               name="assignations"
               error={formik.touched.assignations && Boolean(formik.errors.assignations)}
               helperText={formik.touched.assignations && formik.errors.assignations}
            >
               {technicians.map((technician) => (
                  <MenuItem key={technician.id} value={technician.id}>
                     {technician.name}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         <TextField
            fullWidth
            id="n_OS"
            name="n_OS"
            label="Numéro d'OS"
            onChange={formik.handleChange}
            error={formik.touched.n_OS && Boolean(formik.errors.n_OS)}
            helperText={formik.touched.n_OS && formik.errors.n_OS}
         />
         <FormControl fullWidth>
            <InputLabel id="date_debut-label">Date de début</InputLabel>
            <TextField
               id="date_debut"
               name="date_debut"
               type="datetime-local"
               onChange={formik.handleChange}
               error={formik.touched.date_debut && Boolean(formik.errors.date_debut)}
               helperText={formik.touched.date_debut && formik.errors.date_debut}
            />
         </FormControl>
         <FormControl fullWidth>
            <InputLabel id="date_fin-label">Date de fin</InputLabel>
            <TextField
               id="date_fin"
               name="date_fin"
               type="datetime-local"
               onChange={formik.handleChange}
               error={formik.touched.date_fin && Boolean(formik.errors.date_fin)}
               helperText={formik.touched.date_fin && formik.errors.date_fin}
            />
         </FormControl>
         <Button onClick={onCancel}>Annuler</Button>
         {/* Bouton de soumission */}
         <Button type="submit" variant="contained" color="primary">
            Soumettre
         </Button>
      </form>
   );
};

TaskForm.propTypes = {
   activities: PropTypes.shape({
      map: PropTypes.func
   }),
   callers: PropTypes.shape({
      map: PropTypes.func
   }),
   categories: PropTypes.shape({
      map: PropTypes.func
   }),
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
   technicians: PropTypes.shape({
      map: PropTypes.func
   })
};

export default TaskForm;
