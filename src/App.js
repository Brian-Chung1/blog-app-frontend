import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import blogService from './services/blogs';
import { Link, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import BlogView from './components/BlogView';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAllBlogs();
        setBlogs(blogs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   if() {

  //   }
  // }, [])

  const handleLikes = async (id, likes) => {
    const likedBlog = await blogService.likeBlog(id, { likes });
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : likedBlog)));
    console.log(blogs);
    console.log('Liked');
  };

  const match = useRouteMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  console.log(blog);

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Switch>
            <Route path="/" exact>
              <Content blogs={blogs} handleLikes={handleLikes} />
            </Route>
            <Route path="/blogs/:id">
              <BlogView
                blog={blog}
                handleLikes={handleLikes}
                username={'brian'}
              />
            </Route>
          </Switch>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};

export default App;
