import React, { useState, useContext, useEffect } from 'react';
import Comments from './Comments';
import Grid from '@material-ui/core/Grid';
import { Divider, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CircularProgress from '@material-ui/core/CircularProgress';
import blogService from '../services/blogs';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import Button from '@material-ui/core/Button/Button';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Avatar from '@material-ui/core/Avatar';
import BlogEditForm from './BlogEditForm';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ConfirmationDialog from './ConfirmationDialog';
import { dateFormatter } from '../utils/index';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  content: {
    minHeight: '100px',
  },
  buttons: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  headerRight: {
    marginLeft: 'auto',
  },
}));

const BlogView = ({
  blog,
  handleLikes,
  handleComment,
  handleEdit,
  handleDelete,
}) => {
  const classes = useStyles();
  let history = useHistory();
  const { user } = useContext(UserContext);
  const [fields, setFields] = useState('');
  const { dispatchNotification } = useNotification();
  const [editBlog, setEdit] = useState(false);
  const [deleteBlog, setDelete] = useState(false);

  if (!blog) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  const checkBlogAuth = (user, authorId) => {
    if (user) {
      return user.id === authorId ? true : false;
    } else {
      return false;
    }
  };

  const closeEditForm = () => {
    setEdit(false);
  };

  const closeDeleteDialog = () => {
    setDelete(false);
  };

  const { title, author, authorId, comments, created, likes, content, id } = blog; //prettier-ignore

  const setNotification = (severity, message) => {
    dispatchNotification({
      type: 'ADD',
      data: {
        severity: severity,
        message: message,
      },
    });
  };

  const comment = async (e) => {
    try {
      e.preventDefault();
      if (fields.trim() === '') {
        return;
      }
      setNotification('success', 'Commented on Post');
      await handleComment(id, { comment: fields });
      setFields('');
    } catch (err) {
      setNotification('error', 'Failed to Comment on Post');
      console.error(err);
    }
  };

  const share = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setNotification('success', 'Copied link to blog!');
  };

  const nonUserRedirect = () => {
    setNotification('warning', 'Must login to comment');
    history.push('/login');
  };

  return (
    <>
      <Paper elevation={3} variant="outlined" className={classes.paper}>
        <Grid container spacing={2} direction="column" className={classes.root}>
          <Grid item className={classes.header}>
            <div>
              <Typography variant="h2">{title}</Typography>
              <Typography>{`${dateFormatter(
                created
              )} by ${author}`}</Typography>
            </div>

            <Typography variant="h3" className={classes.headerRight}>
              {likes}
              <FavoriteIcon
                fontSize="large"
                color="secondary"
                className={classes.buttons}
              />
            </Typography>
          </Grid>

          <Divider />
          <Grid item className={classes.content}>
            {editBlog ? (
              <BlogEditForm
                currentContent={content}
                closeEditForm={closeEditForm}
                handleEdit={handleEdit}
                id={id}
              />
            ) : (
              <Typography>{content}</Typography>
            )}
          </Grid>
          <Grid item container direction="row">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FavoriteIcon />}
              className={classes.buttons}
              onClick={() => handleLikes(id, likes + 1)}
            >
              Like
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShareIcon />}
              className={classes.buttons}
              onClick={share}
            >
              Share
            </Button>

            {checkBlogAuth(user, authorId) && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  className={classes.buttons}
                  onClick={() => setEdit(true)}
                >
                  Edit Post
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DeleteForeverIcon />}
                  className={classes.buttons}
                  onClick={() => setDelete(true)}
                >
                  Delete Post
                </Button>
              </>
            )}

            <ConfirmationDialog
              open={deleteBlog}
              handleClose={closeDeleteDialog}
              handleDelete={handleDelete}
              id={id}
            />
          </Grid>
          <Grid item>
            {fields}
            <TextField
              id="filled-full-width"
              label={user ? `Comment as ${user.username}` : 'Login to comment'}
              placeholder="Write a Comment"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              value={fields}
              onChange={({ target }) => setFields(target.value)}
            />
            <Fab
              onClick={user ? comment : nonUserRedirect}
              color="primary"
              variant="extended"
              aria-label="comment"
            >
              <ChatBubbleIcon className={classes.extendedIcon} />
              Comment
            </Fab>
          </Grid>
          <Typography variant="h5">Comments</Typography>
          <Grid item>
            {comments.map((comment) => (
              <Comments key={comment._id} commentObj={comment} />
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default BlogView;
