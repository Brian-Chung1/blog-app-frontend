import axios from 'axios';
const baseUrl = '/api/users';

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getIdUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { getAllUsers, getIdUser, createUser };
