import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  typographyStyles: {
    flex: 1,
  },
  buttonSpacing: {
    marginRight: theme.spacing(1),
  },
}));

const Header = () => {
  let history = useHistory();
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.testing}>
      <Toolbar>
        <Typography
          className={classes.typographyStyles}
          onClick={() => history.push('/')}
        >
          Blog App
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          className={classes.buttonSpacing}
        >
          Login
        </Button>
        <Button color="inherit" variant="outlined">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
