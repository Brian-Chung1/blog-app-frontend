import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CardActionArea from '@material-ui/core/CardActionArea';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { useHistory } from 'react-router-dom';
import { dateFormatter, randomColor, usernameColor } from '../utils/index';
import { useNotification } from '../contexts/NotificationContext';
import Divider from '@material-ui/core/Divider';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 255,
  },
  iconSpacing: {
    marginRight: theme.spacing(1),
  },
  onCardHover: {
    '&:hover $focusHighlight': {
      opacity: 0,
    },
  },
  title: {
    fontSize: 32,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  focusHighlight: {},
  onUserHover: {
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
    margin: 0,
  },
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: 35,
  },
  padding: {
    paddingBottom: 0,
  },
}));

export const BlogCard = ({ blog, handleLikes }) => {
  let history = useHistory();
  const classes = useStyles();
  const { dispatchNotification } = useNotification();
  const { title, content, likes, author, created, comments, id } = blog;

  const viewBlog = (e) => {
    history.push(`/blogs/${id}`);
  };

  const viewUser = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/user/${author}`);
  };

  const share = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const link = window.location.href;
    navigator.clipboard.writeText(`${link}blogs/${id}`);
    dispatchNotification({
      type: 'ADD',
      data: {
        severity: 'success',
        message: 'Copied link to blog!',
      },
    });
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            aria-label="user-avatar"
            style={{ backgroundColor: usernameColor(author, 30, 80) }}
          >
            {author.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="share" onClick={share}>
            <ShareIcon />
          </IconButton>
        }
        title={
          <Typography className={classes.onUserHover} onClick={viewUser}>
            {author}
          </Typography>
        }
        subheader={dateFormatter(created)}
        className={classes.padding}
      />
      <CardActionArea
        classes={{
          root: classes.onCardHover,
          focusHighlight: classes.focusHighlight,
        }}
        onClick={viewBlog}
      >
        <CardContent className={classes.padding}>
          <Typography className={classes.title} variant="h4" component="h2">
            {title}
          </Typography>
          <Typography className={classes.content} variant="h6" component="p">
            {content}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" onClick={viewBlog}>
          <CommentOutlinedIcon className={classes.iconSpacing} />
          <Typography variant="subtitle2">
            {' '}
            {`${comments ? comments.length : 0} Comments`}
          </Typography>
        </Button>
        <IconButton
          aria-label="like"
          onClick={() => handleLikes(id, likes + 1)}
        >
          <FavoriteBorderIcon />
        </IconButton>
        <Typography>{likes}</Typography>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
