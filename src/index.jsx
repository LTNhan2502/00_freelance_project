import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './styles/global.scss';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './routes/PrivateRoute';
import Home from './containers/Home/Home';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<App />} >
          <Route 
          index
            path="home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="login" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Login />} 
          />
          <Route 
            path="register" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Register />} 
          />
        </Route>
      </Routes>      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
