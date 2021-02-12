import React from 'react';
import BlogCard from './BlogCard';
import { Grid } from '@material-ui/core';

const Content = ({ blogs, handleLikes }) => {
  return (
    <Grid container spacing={2}>
      {blogs.map((blog) => {
        return (
          <Grid key={blog.id} item xs={12} sm={4}>
            <BlogCard blog={blog} handleLikes={handleLikes} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Content;
