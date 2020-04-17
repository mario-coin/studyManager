import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import { render } from 'react-dom';

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
  handleSubmit(event) {
    event.preventDefault();

    alert('a');
  }

  render(){
    const { classes } = this.props;
    // const [usuario, setUsuaruo] = useState("");
    // const [password, setPassword] = useState("");

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus/>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Solicitar
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="/login" variant="body2">
                    Já possui uma conta? Entrar
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

export default withStyles(styles)(Forgot);