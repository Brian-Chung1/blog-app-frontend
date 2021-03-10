import React, { useState, useEffect, useContext, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import blogService from './services/blogs';
import userService from './services/user';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import BlogView from './components/BlogView';
import Login from './components/Login';
import Registration from './components/Registration';
import { UserContext } from './contexts/UserContext';
import Profile from './components/Profile';
import Test from './components/Test';
import { useNotification } from './contexts/NotificationContext';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);
  const { dispatchNotification } = useNotification();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogAppUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const handleLikes = async (id, likes) => {
    const likedBlog = await blogService.likeBlog(id, { likes });
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : likedBlog)));
  };

  const handleComment = async (id, comment) => {
    const commentedBlog = await blogService.commentBlog(id, comment);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : commentedBlog)));
  };

  const handleBlogSubmission = async (blog) => {
    const newBlog = await blogService.postBlog(blog);
    setBlogs(blogs.concat(newBlog));
    return newBlog;
  };

  const handleEdit = async (id, content) => {
    const edittedBlog = await blogService.editBlog(id, { content });
    console.log('Editted Blog Below');
    console.log(edittedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : edittedBlog)));
  };

  const handleDelete = async (id) => {
    await blogService.deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const match = useRouteMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <>
      <UserContext.Provider value={userProvider}>
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
                    handleComment={handleComment}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </Route>
                <Route path="/submit">
                  {window.localStorage.getItem('blogAppUser') ? (
                    <BlogForm handleBlogSubmission={handleBlogSubmission} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path={'/user/:username'}>
                  <Profile handleLikes={handleLikes} />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/">
                  <div>404</div>
                </Route>
              </Switch>
            </Grid>
            <Grid item xs={false} sm={2} />
          </Grid>
        </Grid>
      </UserContext.Provider>
    </>
  );
};

export default App;
