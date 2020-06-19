import React from 'react';
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
import moment from "moment";
import "moment-timezone";


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

class UserEditProfile extends React.Component {
  constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);
      this.myChangeHandler = this.myChangeHandler.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        user: {
            name: '',
            email: '',
        },
        snackbarMessage: ''
      }
  }

  async submit(event) {
      event.preventDefault();
      api.put(`/api/user/editProfile`, this.state.user)
      .then(
          (response) => {
            window.location.href = "/";
          },
          (error) => {
              this.setState({'snackbarMessage': error.response.data });
          }
      );
  }

  componentDidMount() {
    this.loadUser();
  }
    
  loadUser = () => {
    api.get("/api/user/editProfile")
    .then(
      (response) => {
        this.setState({'user': response.data.user });
        console.log(response.data.user);
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }

  myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;

      let user = this.state.user;
      user[nam] = val;
      this.setState({'user': user});
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
                <Paper align="center" className={classes.paper}>Editar Dados</Paper>
              </Grid>
              <form className={classes.paper} onSubmit={this.submit}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  value={this.state.user.name}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  onChange={this.myChangeHandler}/>
                </Grid>
                <Grid item xs={6}>
                <TextField 
                  autoComplete="desc"
                  name="email"
                  value={this.state.user.email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  onChange={this.myChangeHandler}/>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Alterar dados
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

export default withStyles(styles)(UserEditProfile);