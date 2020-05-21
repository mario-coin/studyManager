import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../../template/footer';
import api from '../../../services/api';
import { login } from "../../../services/auth";

import { withRouter} from 'react-router-dom';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.state = {
          login: {
              username: '',
              password: ''
          },
          snackbarMessage: ''
      };
  }

  handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;

      let login = this.state.login;
      login[nam] = val;
      this.setState({'login': login});
  }

  async submit(event) {
    event.preventDefault();
    
    api.post("/api/user/login", this.state.login)
    .then(
      (response) => {
        login(response.data);
        this.props.history.push("/");
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }
  
  handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      this.setState({'snackbarMessage': '' });
  };

  render(){
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form className={classes.form} onSubmit={this.submit}>
            <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Usuario" name="username" autoComplete="username" autoFocus onChange={this.handleChange}/>
            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="password" onChange={this.handleChange}/>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembrar senha"/>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Entrar
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
            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(withRouter(Login));