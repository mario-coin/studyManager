import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
    constructor(props){
        super(props);

    }
//   const classes = useStyles();

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        console.log(this.state);
    }

    async submit(event) {
        event.preventDefault();
        
        try {
            const response = await api.post("/api/user/register", this.state);
            console.log(response.data);
            this.props.history.push("/login");
        } catch (err) {
            this.setState({
                error:
                "Houve um problema com o login, verifique suas credenciais. T.T"
            });
        }

        // if (!email || !password) {
        //   this.setState({ error: "Preencha e-mail e senha para continuar!" });
        // } else {
        //   try {
        //     const response = await api.post("/sessions", { email, password });
        //     login(response.data.token);
        //     this.props.history.push("/app");
        //   } catch (err) {
        //     this.setState({
        //       error:
        //         "Houve um problema com o login, verifique suas credenciais. T.T"
        //     });
        //   }
        // }
    }

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
                    <TextField variant="outlined" required fullWidth id="user" label="Usuário" name="user" autoComplete="user" onChange={this.myChangeHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="current-password" onChange={this.myChangeHandler}/>
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Cadastrar
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" variant="body2">
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

export default withStyles(styles)(Register);