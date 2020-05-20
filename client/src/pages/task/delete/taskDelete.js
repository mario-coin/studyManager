import React, { useState } from 'react';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import Header from '../../../template/header';
import Snackbar from '@material-ui/core/Snackbar';
import Chat from '@material-ui/icons/Chat';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../../template/footer'
import { TextField, MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import api from '../../../services/api'
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    width: '100%',
    minWidth: 650,
  },
  tableRow: {
    verticalAlign: 'top'
  },
  tableCell: {
    width: '33%'
  },
  card: {
    width: 250,
    margin: theme.spacing(1),
    float: 'left'
  },
});

class TaskDelete extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      task: {
          name: '',
          description: '',
          start_date: '',
          complexity: '',
          deadline: '',
          duration: '',
          type: ''
      },
      snackbarMessage: '',
    }
  }


  async submit(event) {
    event.preventDefault();
    api.delete(`/api${this.props.location.pathname}`, this.state.task)
    .then(
        (response) => {
            this.props.history.push("/task");
        },
        (error) => {
            this.setState({'snackbarMessage': error.response.data });
        }
    );
  }


  async deleteTask (){
    api.delete(`/api${this.props.location.pathname}`, this.state.task)
    .then(
      (response) => {
        this.props.history.push("/task");
    },
    (error) => {
        this.setState({'snackbarMessage': error.response.data });
    }
    )
  }

  render(){
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          
          <Grid container justify="center" className={classes.root}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Paper align="center" className={classes.paper}>Tem certeza que deseja deletar a tarefa?</Paper>
                <button onClick={this.deleteTask}>Confirmar</button>
                <button Redirect to={`/task/`}>Cancelar</button>
              </Grid>
            </Grid>
          </Grid>
          
          <Footer />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(TaskDelete);