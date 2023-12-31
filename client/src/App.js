import './App.css';
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from './components/Login';
import Register from './components/Register';
import Nav from "./components/Nav";
import Bin from './components/Bin';
import Profile from './components/Profile';
import { Auth } from './auth/Auth';
import Results from './components/Results';
import axios from "axios";
import Leaderboard from './components/Leaderboard';


let styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0 0.5em',
    fontSize: '1.15em',
    whiteSpace: 'inherit'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}



export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  const [uploaded, setUploaded] = useState(null)
  const [userInfo, setUserInfo] = useState({
    user_id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  })
  

  useEffect(() => {
    fetchUserInfo()
  }, [token,uploaded])


  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/user-info");
      const data = response.data
      setUserInfo({
        user_id: data[0].user_id,
        username: data[0].username,
        first_name: data[0].first_name,
        last_name: data[0].last_name,
        email: data[0].email,
        avatar: data[0].avatar
      })
    } catch (err) {
      console.log(err)
    }
  }
  

  return (
    <AppContext.Provider value={{ token, setToken, userInfo, setUserInfo, uploaded, setUploaded}}>
      {token && <Auth><Nav /></Auth>}
      <Routes>
        {token? (
          <>
            <Route path="/profile" element={<Auth><Profile title="Profile" /></Auth>} />
            <Route path="/bin" element={<Auth><Bin title="Bin" /></Auth>} />
            <Route path="/results" element={<Auth><Results title="Results" /></Auth>} />
            <Route path='/leaderboard' element={<Auth><Leaderboard title="Leaderboard" /></Auth>}/>
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<SignIn title="Login" />} />
            <Route path="/register" element={<Register title="Register" />} />
          </>
        )}
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
