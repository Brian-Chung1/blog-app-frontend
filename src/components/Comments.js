import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const Comments = ({ commentObj }) => {
  const { comment, timestamp, username } = commentObj;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="avatar">U</Avatar>}
        title={username}
        subheader={timestamp}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comments;
