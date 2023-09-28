import logo from './logo.svg';
import './App.css';
import { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { SignIn } from './components/Login';
import Register from './components/Register';
import Nav from "./components/Nav";

export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <Nav />
      <Routes>
        <Route path="/login" element={<SignIn title="Login" />} />
        <Route path="/register" element={<Register title="Register" />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
