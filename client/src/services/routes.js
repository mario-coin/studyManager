import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Router } from "react-router-dom";
import { isAuthenticated } from "./auth";

import UserIndex from '../pages/user/index/userIndex';
import UserCreate from '../pages/user/create/userCreate';
import UserEdit from '../pages/user/edit/userEdit';
import UserDelete from '../pages/user/delete/userDelete';
import TaskIndex from '../pages/task/index/taskIndex';
import TaskCreate from '../pages/task/create/taskCreate';
import ConfigTask from '../pages/task/configTask/configTask'
import TaskEdit from '../pages/task/edit/taskEdit';
import TaskDelete from '../pages/task/delete/taskDelete';
import Gantt from '../pages/gantt/gantt';
import Forgot from '../pages/auth/forgot/forgot';
import Login from '../pages/auth/login/login';
import Register from '../pages/auth/register/register';
import Reset from '../pages/auth/forgot/reset'
import Kanban from '../pages/kanban/kanban';

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
        <Route path="/reset/:token">
            <Reset />
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
        <PrivateRoute path="/user/editProfile" component={() => <UserEdit /> }/>
        <PrivateRoute path="/user/delete" component={() => <UserDelete /> }/>
        <PrivateRoute path="/user/" component={() => <UserIndex /> }/>
        {/* Tarefa */}
        <PrivateRoute path="/task/create" component={() => <TaskCreate /> }/>
        <PrivateRoute path="/task/configTask" component={() => <ConfigTask /> }/>
        <PrivateRoute path="/task/delete/:id" component={(props) => <TaskDelete {...props} /> }/>
        <PrivateRoute path="/task/edit/:id" component={(props) => <TaskEdit {...props}/> }/>
        <PrivateRoute path="/task/" component={() => <TaskIndex /> }/>
        {/* Gantt */}
        <PrivateRoute path="/gantt/" component={() => <Gantt /> }/>
        {/* Por último, se nenhuma das rotas acima contemplar */}
        <PrivateRoute path="/kanban" component={() => <Kanban />}/>
        <PrivateRoute path="/" component={() => 
            <Kanban />
            // <Hello />
        }/>
    </Switch>
  </BrowserRouter>
);

export default Routes;