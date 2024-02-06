//App.js
import React from 'react';
import Home from './components/Home';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
};

export default App;
