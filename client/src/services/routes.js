import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";

import Dashboard from '../pages/dashboard/dashboard';
import Forgot from '../pages/auth/forgot/forgot';
import Login from '../pages/auth/login/login';
import Register from '../pages/auth/register/register';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
        {/* Public routes */}
        <Route path="/forgot">
            <Forgot />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>

        {/* Routes validated by the token */}
        <PrivateRoute path="/" component={() => 
            <Dashboard />
            // <Hello />
        }/>
    </Switch>
  </BrowserRouter>
);

export default Routes;