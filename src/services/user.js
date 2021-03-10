import axios from 'axios';
const baseUrl = '/api/user';

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getIdUser = async (id) => {
  const response = await axios.get(`${baseUrl}/id/${id}`);
  return response.data;
};

const getUsernameUser = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

export default { getAllUsers, getIdUser, getUsernameUser };
