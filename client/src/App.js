import React from "react";

import {Container, Typography, AppBar, Grid, Grow} from "@material-ui/core"
import memories from "./images/memories.png"
import Navbar from './components/Navbar/Navbar'

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Login from "./components/Login"

const App = ()=> {


    return (
      <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Switch>
              <Route path='/' exact component = {Home} />
              <Route path='/auth' exact component = {Auth} />
              <Route path='/authenticate' exact component = {Login} />

            </Switch>

        </Container>
      </BrowserRouter>
    )
}

export default App;
