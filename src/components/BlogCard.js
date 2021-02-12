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

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  iconSpacing: {
    marginRight: theme.spacing(1),
  },
}));

export const BlogCard = ({ blog, handleLikes }) => {
  let history = useHistory();
  const classes = useStyles();
  const { title, content, likes, author, created, comments, id } = blog;

  const viewBlog = () => {
    history.push(`/blogs/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        }
        title={author}
        subheader={created}
      />
      <CardActionArea onClick={viewBlog}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" onClick={viewBlog}>
          <CommentOutlinedIcon className={classes.iconSpacing} />
          <Typography variant="subtitle2">
            {' '}
            {`${comments.length} Comments`}
          </Typography>
          {/* {`${comments.length} Comments`} */}
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
