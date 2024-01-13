import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate,Routes,Route} from 'react-router-dom'
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
  

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>

        <CssBaseline/>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/profile/:userId' element={<ProfilePage/>}/>
          </Routes>

    </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
