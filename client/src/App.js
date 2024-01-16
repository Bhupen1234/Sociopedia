import logo from './logo.svg';
// import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';

import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';



function App() {
  const mode =  useSelector((state)=>state.mode)
  const theme = createTheme(themeSettings(mode))

  const isAuth = Boolean(useSelector((state)=>state.token));

  

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>

        <CssBaseline/>
          <Routes>
            <Route path='/' element={ <LoginPage/>}/>
            <Route path='/home' element={ isAuth? <HomePage/> : <Navigate to="/"/> }/>
            <Route path='/profile/:userId' element={isAuth? <ProfilePage/> : <Navigate to="/" />}/>
          </Routes>

    </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
