import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql-client'; 
import Login from './components/Login';
import Account from './components/Account';
import './style.css';


function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {loggedIn ? <Account setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />}
      </div>
    </ApolloProvider>
  );
}

export default App;
