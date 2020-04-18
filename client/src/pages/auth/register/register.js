import React from 'react';
import { withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../../template/footer';
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            user: {
                name: '',
                email: '',
                username: '',
                password: ''
            },
            snackbarMessage: ''
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        let user = this.state.user;
        user[nam] = val;
        this.setState({'user': user});
    }

    async submit(event) {
        event.preventDefault();
        
        api.post("/api/user/register", this.state.user)
        .then(
            (response) => {
                this.props.history.push("/login");
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" label="Nome" autoFocus onChange={this.myChangeHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth id="email" label="Email" name="email" autoComplete="email" onChange={this.myChangeHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth id="username" label="Usuário" name="username" autoComplete="username" onChange={this.myChangeHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="current-password" onChange={this.myChangeHandler}/>
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Cadastrar
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
                        Já possui uma conta? Entrar
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Footer />
            </Box>
            </Container>
        );
    }
}

export default withStyles(styles)(withRouter(Register));