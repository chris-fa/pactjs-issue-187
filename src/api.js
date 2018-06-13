import fetch from 'node-fetch';

const defaultOpts = {
  headers: {
    Accept: 'application/json',
  }
};

export const getUsers = () => fetch('http://localhost:3003/api/v1/users', defaultOpts)
  .then(response => response.json())
  .then(body => body.users)
  .catch(err => Promise.reject(err));
