import React, { useState } from 'react';

import { withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { browserHistory } from 'history'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../../template/footer';
import { render } from 'react-dom';
import api from '../../../services/api'
import axios from 'axios';

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

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose= this.handleClose.bind(this);
    console.log(this.props.match.params.token);

    this.state = {
      reset: {
        password: '',
        token: this.props.match.params.token,
        email: '',
      },
      snackbarMessage: ''
    };
  }
  
    async submit(event) {
        event.preventDefault();
        
        api.post('/api/user/reset', this.state.reset)
        .then(
            (response) => {
                alert("Senha Alterada com Sucesso!");
                this.props.history.push("/login");
            },
            (error) => {
                this.setState({'snackbarMessage': error.response.data });
            }
        );
    }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let reset = this.state.reset;
    reset[nam] = val;
    this.setState({'reset': reset});
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth id="email" label="Email" name="email" autoComplete="email" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Alterar Senha
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
          </form>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(withRouter(Reset));