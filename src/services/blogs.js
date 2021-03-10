import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getIdBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const likeBlog = async (id, likes) => {
  const response = await axios.put(`${baseUrl}/${id}`, likes);
  return response.data;
};

const commentBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${id}/comments`,
    comment,
    config
  );
  return response.data;
};

const editBlog = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}/edit`, content, config);
  return response.data;
};

export default {
  setToken,
  getAllBlogs,
  getIdBlog,
  postBlog,
  deleteBlog,
  likeBlog,
  commentBlog,
  editBlog,
};
