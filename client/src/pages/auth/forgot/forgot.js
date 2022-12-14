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

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
      forgot: {
        email: ''
      },
      snackbarMessage: ''
    };
}
  
  
  async submit(event) {
    event.preventDefault();
    
    api.post("/api/user/forgot", this.state.forgot)
    .then(
        (response) => {
            alert("Link enviado por e-mail, favor verificar.")
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

    let forgot = this.state.forgot;
    forgot[nam] = val;
    this.setState({'forgot': forgot});
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
            <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus onChange={this.handleChange}/>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Solicitar
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
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="/login" variant="body2">
                    J?? possui uma conta? Entrar
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

export default withStyles(styles)(withRouter(Forgot));