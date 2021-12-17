import React from 'react'
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux"

import './styles/styles.css'

import { routes } from './services/routes/routes'

import { Container } from '@mui/material';
import Main from './pages/Main';
import Error from './pages/public/Error';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Detail from './pages/private/Detail';
import Dashboard from './pages/private/Dashboard';

export const token = "WqQ28sQlYGIRccH2sSAGKBFOViqYELNJhOsc3SLb7AzJbvUT0V0teVnP8L4bWuJQ";

function App() {
  const user = useSelector((state) => state.user)
  console.log(user)
  return (

    <Container fixed sx={{ height: '100vh' }}>
      <Routes>
        <Route exact path={routes.HOME} element={<Main />} />
        <Route exact path={routes.LOGIN} element={<Login />} />
        <Route exact path={routes.REGISTER} element={<Register />} />
        <Route path={"*"} element={<Error />} />
        {user &&
          <Route>
            <Route exact path={routes.DASHBOARD} element={<Dashboard />} />
            <Route exact path={routes.DETAIL + ":id"} element={<Detail />} />
          </Route>
        }
      </Routes>
    </Container>

  );
}

export default App;
