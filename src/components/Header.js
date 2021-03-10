import React, { useContext } from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { UserContext } from '../contexts/UserContext';
import blogService from '../services/blogs';
import { useNotification } from '../contexts/NotificationContext';
import PostAddIcon from '@material-ui/icons/PostAdd';
import IconButton from '@material-ui/core/IconButton';
import { usernameColor } from '../utils/index';
import GestureIcon from '@material-ui/icons/Gesture';

const useStyles = makeStyles((theme) => ({
  typographyStyles: {
    flexGrow: 1,
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  headerSpacing: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  button: {
    color: '#1d3557',
  },
  logo: {
    marginRight: 'auto',
  },
}));

const Header = () => {
  let history = useHistory();
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const { dispatchNotification } = useNotification();

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser');
    setUser(null);
    blogService.setToken(null);
    dispatchNotification({
      type: 'ADD',
      data: {
        open: true,
        severity: 'info',
        message: `${user.username} logged out`,
      },
    });
  };

  if (user) {
    return (
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="h4" onClick={() => history.push('/')}>
            Blogger
          </Typography>
          <IconButton
            edge="start"
            className={classes.logo}
            onClick={() => history.push('/')}
          >
            <GestureIcon style={{ fontSize: 40 }} color="secondary" />
          </IconButton>

          <Button
            variant="outlined"
            className={classes.button}
            color="inherit"
            startIcon={<PostAddIcon />}
            className={classes.headerSpacing}
            onClick={() => history.push('/submit')}
          >
            Create Post
          </Button>
          <IconButton onClick={() => history.push(`/user/${user.username}`)}>
            <Avatar
              style={{ backgroundColor: usernameColor(user.username, 30, 80) }}
            >
              {user.username.charAt(0)}
            </Avatar>
          </IconButton>
          <Button
            color="inherit"
            variant="outlined"
            className={classes.headerSpacing}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" className={classes.nav}>
      <Toolbar>
        <Typography variant="h4" onClick={() => history.push('/')}>
          Blogger
        </Typography>
        <IconButton
          edge="start"
          className={classes.logo}
          onClick={() => history.push('/')}
        >
          <GestureIcon style={{ fontSize: 40 }} color="secondary" />
        </IconButton>
        <Button
          color="inherit"
          variant="outlined"
          className={classes.headerSpacing}
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => history.push('/register')}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
