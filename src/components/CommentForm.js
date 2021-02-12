import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const CommentForm = ({ username }) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        id="filled-full-width"
        label={`Comment as ${username}`}
        style={{ margin: 8 }}
        placeholder="Write a Comment"
        helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />
    </div>
  );
};

export default CommentForm;
