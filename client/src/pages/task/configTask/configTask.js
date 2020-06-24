import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../../template/header';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../../template/footer'
import { TextField } from '@material-ui/core';

import api from '../../../services/api'


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
  }
});

class ConfigTask extends React.Component {
  constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);
      this.myChangeHandler = this.myChangeHandler.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        task: {
            durationAtividade: '',
            durationTrabalho: '',
            durationProva: ''
        },
        snackbarMessage: ''
      }
  }

  async submit(event) {
      event.preventDefault();
      api.put(`/api/task/configTask`, this.state.task)
      .then(
          (response) => {
            window.location.href = "/task";
            this.setState({'snackbarMessage': response.data });
          },
          (error) => {
              this.setState({'snackbarMessage': error.response.data });
          }
      );
  }

  myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;

      let task = this.state.task;
      task[nam] = val;
      this.setState({'task': task});
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    this.setState({'snackbarMessage': '' });
  };

  render(){
    const { classes } = this.props;
    const current_page = this.props.history;
    return (
      <div className={classes.root}>
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          
          <Grid container justify='center' className={classes.root}>
            <Grid container justify='center'>
              <Grid item xs={12}>
                <Paper align="center" className={classes.paper}>Configurar alerta de proximidade de entrega das tarefas</Paper>
              </Grid>
              <form className={classes.paper} onSubmit={this.submit}>
              <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="durationAtividade"
                  name="durationAtividade"
                  type="number"
                  value={this.state.task.durationAtividade}
                  variant="outlined"
                  fullWidth
                  id="durationAtividade"
                  label="Alerta da atividade"
                  autoFocus
                  onChange={this.myChangeHandler}/>
                </Grid>
                <Grid item xs={6}>
                <TextField
                  autoComplete="durationTrabalho"
                  name="durationTrabalho"
                  type="number"
                  value={this.state.task.durationTrabalho}
                  variant="outlined"
                  fullWidth
                  id="durationTrabalho"
                  label="Alerta do trabalho"
                  autoFocus
                  onChange={this.myChangeHandler}/>
                </Grid>
                <Grid item xs={6}>
                <TextField
                  autoComplete="durationProva"
                  name="durationProva"
                  type="number"
                  value={this.state.task.durationProva}
                  variant="outlined"
                  fullWidth
                  id="durationProva"
                  label="Alerta da prova"
                  autoFocus
                  onChange={this.myChangeHandler}/>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Alterar configurações
                </Button>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackbarMessage.length > 0}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    message={this.state.snackbarMessage}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />                         
              </Grid>
              </form>
            </Grid>
          </Grid>

          
          <Footer />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(ConfigTask);