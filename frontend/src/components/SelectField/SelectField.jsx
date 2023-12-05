import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const SelectField = ({
   label,
   name,
   value,
   onChange,
   options,
   error,
   helperText,
   multiple = false,
   defaultOptionLabel = 'Sélectionnez ....'
}) => (
   <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
         labelId={`${name}-label`}
         id={name}
         value={value}
         onChange={onChange}
         name={name}
         error={error && Boolean(error)}
         helperText={error && helperText}
         multiple={multiple}
         variant="standard"
      >
         {defaultOptionLabel && (
            <MenuItem value="" disabled>
               {defaultOptionLabel}
            </MenuItem>
         )}
         {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
               {option.nom}
               {option.name}
            </MenuItem>
         ))}
      </Select>
   </FormControl>
);

SelectField.propTypes = {
   error: PropTypes.func,
   helperText: PropTypes.any,
   label: PropTypes.any,
   multiple: PropTypes.bool,
   name: PropTypes.any,
   onChange: PropTypes.any,
   options: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         nom: PropTypes.string.isRequired
      })
   ),
   value: PropTypes.any,
   defaultOptionLabel: PropTypes.string
};

export default SelectField;
