import React from 'react';
import clsx from 'clsx';
import { withRouter} from 'react-router-dom';
import { fade, withStyles } from '@material-ui/core/styles';
import Header from '../../../template/header';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
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
import FormControl from '@material-ui/core/FormControl';

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
  formControl: {
    display: 'flex',
  }
});

class TaskEdit extends React.Component {
  constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);
      this.myChangeHandler = this.myChangeHandler.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.state = {
        task: {
            name: '',
            description: '',
            start_date: '',
            complexity: '',
            deadline: '',
            duration: '',
            type: '',
            dependency: '',
        },
        snackbarMessage: '',
        dependencies: []
      }
  }
  
  componentDidMount() {
    this.loadTask();
  }

  loadTask = () => {
    api.get(`api${this.props.location.pathname}`)
    .then(
      (response) => {
        this.setState({'task': response.data.task });
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );

    let paths = this.props.location.pathname.split('/');
    api.get("/api/task/dependency", { params: {id: paths[paths.length -1]}})
    .then(
      (response) => {
        console.log(response.data);
        this.setState({'dependencies': response.data.tasks });
      },
      (error) => {
        this.setState({'dependencies': error.response.data });
      }
    );
  }

  async submit(event) {
      event.preventDefault();
      api.put(`/api${this.props.location.pathname}`, this.state.task)
      .then(
          (response) => {
              api.put(`/api/notification/edit/${this.props.match.params.id}`, this.state.task)
              // api.put(`/api${this.props.location.pathname}`, this.state.task)
                .then(
                    (response) =>{
                        this.props.history.push("/task");
                    },
                    (error) => {
                        this.setState({'snackbarMessage': error.response.data });
                    }
                )
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
                <Paper align="center" className={classes.paper}>Editar Tarefa</Paper>
              </Grid>
              <form className={classes.paper} onSubmit={this.submit}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <TextField autoComplete="name" name="name" value={this.state.task.name} required variant="outlined" fullWidth id="name" label="Nome" autoFocus onChange={this.myChangeHandler}/>
                </Grid>
                <Grid item xs={6}>
                <TextField autoComplete="desc" name="description" value={this.state.task.description} required variant="outlined" fullWidth id="description" label="Descri????o" autoFocus onChange={this.myChangeHandler}/>
                </Grid>
                <Grid item xs={6}>
                <TextField autoComplete="start" name="start_date" value={moment(this.state.task.start_date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")} required variant="outlined" fullWidth id="start_date" label="Data Inicio" autoFocus onChange={this.myChangeHandler} InputLabelProps={{ shrink: true}}/>
                </Grid>
                <Grid item xs={6}>
                <TextField autoComplete="deadline" name="deadline" value={moment(this.state.task.deadline).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")} required variant="outlined" fullWidth id="deadline" label="Deadline" autoFocus onChange={this.myChangeHandler} InputLabelProps={{ shrink: true}}/>
                </Grid>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                <InputLabel style={{marginLeft: 15}} required>Complexidade</InputLabel>
                <Select name="complexity" value={this.state.task.complexity} required variant="outlined" fullWidth id="complexity" autoFocus  onChange={this.myChangeHandler}
                >
                    <MenuItem value={'facil'}>F??cil</MenuItem>
                    <MenuItem value={'mediano'}>Mediano</MenuItem>
                    <MenuItem value={'dificil'}>Dif??cil</MenuItem>
                </Select>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <TextField autoComplete="duration" name="duration" value={this.state.task.duration} required variant="outlined" fullWidth id="duration" label="Dura????o" autoFocus onChange={this.myChangeHandler}/>
                </Grid>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                <InputLabel style={{marginLeft: 15}} required>Tipo</InputLabel>
                <Select name="type" value={this.state.task.type} required variant="outlined" fullWidth id="type" autoFocus onChange={this.myChangeHandler}
                >
                    <MenuItem value={'atividade'}>Atividade</MenuItem>
                    <MenuItem value={'trabalho'}>Trabalho</MenuItem>
                    <MenuItem value={'prova'}>Prova</MenuItem>
                </Select>
                </FormControl>
                </Grid> 
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel style={{marginLeft: 15}}>Depend??ncia</InputLabel>
                  <Select name="dependency" variant="outlined" value={this.state.task.dependency} onChange={this.myChangeHandler}>
                    <MenuItem value={null}>-</MenuItem>
                    {this.state.dependencies.map(({ id, name }, index) => <MenuItem value={id}>{name}</MenuItem>)}
                  </Select>
                  </FormControl>
                </Grid> 
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Editar Tarefa
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

export default withStyles(styles)(withRouter(TaskEdit));