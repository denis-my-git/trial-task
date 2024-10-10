import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
    }
  }
`;

function Login({ setLoggedIn }) {
  const [identifier, setIdentifier] = useState('test@freshcells.de');  
  const [password, setPassword] = useState('KTKwXm2grV4wHzW');         
  const [login, { data, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        variables: { 
          input: { identifier, password } 
        }
      });
      if (result.data.login.jwt) {
        localStorage.setItem('token', result.data.login.jwt);
        setLoggedIn(true);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}  
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>Error logging in!</p>}
    </div>
  );
}

export default Login;
