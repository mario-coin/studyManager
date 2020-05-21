import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";

import Dashboard from '../pages/dashboard/dashboard';
import UserIndex from '../pages/user/index/userIndex';
import UserCreate from '../pages/user/create/userCreate';
import UserEdit from '../pages/user/edit/userEdit';
import UserDelete from '../pages/user/delete/userDelete';
import TaskIndex from '../pages/task/index/taskIndex';
import TaskCreate from '../pages/task/create/taskCreate';
import TaskEdit from '../pages/task/edit/taskEdit';
import TaskDelete from '../pages/task/delete/taskDelete';
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
        {/* ***************************** */}
        {/* ********Public routes******** */}
        {/* ***************************** */}
        <Route path="/forgot">
            <Forgot />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>

        {/* ***************************** */}
        {/* Routes validated by the token */}
        {/* ***************************** */}
        {/* Usuário */}
        <PrivateRoute path="/user/create" component={() => <UserCreate /> }/>
        <PrivateRoute path="/user/edit" component={() => <UserEdit /> }/>
        <PrivateRoute path="/user/delete" component={() => <UserDelete /> }/>
        <PrivateRoute path="/user/" component={() => <UserIndex /> }/>
        {/* Tarefa */}
        <PrivateRoute path="/task/create" component={() => <TaskCreate /> }/>
        <PrivateRoute path="/task/edit/:id" component={(props) => <TaskEdit {...props}/> }/>
        <PrivateRoute path="/task/delete/:id" component={() => <TaskDelete /> }/>
        <PrivateRoute path="/task/" component={() => <TaskIndex /> }/>
        {/* Por último, se nenhuma das rotas acima contemplar */}
        <PrivateRoute path="/" component={() => 
            <Dashboard />
            // <Hello />
        }/>
    </Switch>
  </BrowserRouter>
);

export default Routes;