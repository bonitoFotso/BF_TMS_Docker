import PropTypes from 'prop-types';
import { InputAdornment, FormControl, TextField } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const DateTimeField = ({ label, name, value, onChange, error, helperText }) => (
   <FormControl fullWidth>
      <TextField
         variant="standard"
         label={label}
         id={name}
         name={name}
         type="datetime-local"
         value={value}
         onChange={onChange}
         error={error && Boolean(error)}
         helperText={error && helperText}
         InputProps={{
            startAdornment: (
               <InputAdornment position="start">
                  <EventIcon color="action" />
               </InputAdornment>
            )
         }}
      />
   </FormControl>
);

DateTimeField.propTypes = {
   error: PropTypes.func,
   helperText: PropTypes.any,
   label: PropTypes.any,
   name: PropTypes.any,
   onChange: PropTypes.any,
   value: PropTypes.any
};

export default DateTimeField;
