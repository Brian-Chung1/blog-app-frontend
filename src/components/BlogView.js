import React, { useState } from 'react';
import Comments from './Comments';
import Grid from '@material-ui/core/Grid';
import {
  Divider,
  Paper,
  Typography,
  Card,
  CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

const BlogView = ({ blog, handleLikes, username }) => {
  const classes = useStyles();

  if (!blog) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  const { title, author, comments, created, likes, content, id } = blog;

  return (
    <Grid container direction="column" className={classes.root}>
      <Paper elevation={3} variant="outlined">
        <Grid item>
          <Typography variant="h2">{title}</Typography>
          <Typography>{`${created} by ${author}`}</Typography>
        </Grid>
        <Divider />
        <Grid item>
          <Typography>{content}</Typography>
        </Grid>
        <Grid item>
          <Fab color="primary" variant="extended" aria-label="comment">
            <ChatBubbleIcon className={classes.extendedIcon} />
            Comment
          </Fab>
          <Typography>{`${likes} likes`}</Typography>
          <Fab
            color="secondary"
            variant="extended"
            aria-label="like"
            onClick={() => handleLikes(id, likes + 1)}
          >
            <FavoriteIcon className={classes.extendedIcon} />
            Like
          </Fab>
        </Grid>
        <CommentForm username={username} />
        <Typography variant="h5">Comments</Typography>
        <Grid item>
          {comments.map((comment) => (
            <Comments key={comment._id} commentObj={comment} />
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default BlogView;
