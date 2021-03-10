import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useField } from 'formik';

export const MyTextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      required
      variant="outlined"
      margin="normal"
      label={label}
      type={type}
    />
  );
};

export const MyCheckBox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      {...field}
      control={<Checkbox color="primary" />}
      label={label}
    />
  );
};

export const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      variant="outlined"
      margin="normal"
      label={label}
      multiline
      rows={6}
    />
  );
};

export default { MyTextField, MyTextArea, MyCheckBox };
