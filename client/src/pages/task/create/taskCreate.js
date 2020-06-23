import React from 'react';
import clsx from 'clsx';
import { withRouter} from 'react-router-dom';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import api from '../../../services/api'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

class TaskCreate extends React.Component {
  constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
        autocomplete: []
      }
  }
  
  componentDidMount() {
    api.get("/api/task/autocomplete", {})
    .then(
      (response) => {
        this.setState({'autocomplete': response.data.tasks });
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }

  async submit(event) {
      event.preventDefault();
      api.post("/api/task/create", this.state.task)
      .then(
          (response) => {
              api.post(`/api/notification/create/${response.data}`, this.state.task)
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

  handleChange = (event) => {
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
    
    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.name,
    });
    
    return (
      <div className={classes.root}>
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          
          <Grid container justify='center' className={classes.root}>
            <Grid container justify='center'>
              <Grid item xs={12}>
                <Paper align="center" className={classes.paper}>Criar Tarefa</Paper>
              </Grid>
              <form className={classes.paper} onSubmit={this.submit}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={6}>
                <TextField 
                  autoComplete="desc"
                  name="description"
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  label="Descrição"
                  autoFocus
                  onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={6}>
                <TextField 
                  autoComplete="start"
                  name="start_date"
                  type="datetime-local"
                  variant="outlined"
                  required
                  format="dd/MM/yyyy"
                  fullWidth
                  id="start_date"
                  label="Data Inicio" 
                  autoFocus
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true}}/>
                </Grid>
                <Grid item xs={6}>
                <TextField
                  autoComplete="deadline"
                  name="deadline"
                  variant="outlined"
                  type="datetime-local"
                  format="dd/MM/yyyy"
                  required
                  fullWidth
                  id="deadline"
                  label="Deadline"
                  autoFocus
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true}}/>
                </Grid>
                <Grid item xs={6}>
                <InputLabel>Complexidade</InputLabel>
                <Select 
                  name="complexity"
                  variant="outlined"
                  required
                  fullWidth
                  id="complexity"
                  autoFocus onChange={this.handleChange}
                >
                    <MenuItem value={'facil'}>Fácil</MenuItem>
                    <MenuItem value={'mediano'}>Mediano</MenuItem>
                    <MenuItem value={'dificil'}>Difícil</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={6}>
                <TextField
                  autoComplete="duration"
                  name="duration"
                  variant="outlined"
                  required
                  fullWidth
                  id="duration"
                  label="Duração"
                  autoFocus
                  onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    name="type"
                    variant="outlined"
                    required
                    fullWidth
                    id="type"
                    autoFocus
                    onChange={this.handleChange}
                  >
                      <MenuItem value={'atividade'}>Atividade</MenuItem>
                      <MenuItem value={'trabalho'}>Trabalho</MenuItem>
                      <MenuItem value={'prova'}>Prova</MenuItem>
                  </Select>
                </Grid> 
                <Grid item xs={6}>
                  <InputLabel>Dependência</InputLabel>
                  <Autocomplete
                    id="filter-demo"
                    fullWidth
                    options={this.state.autocomplete}
                    getOptionLabel={(option) => { this.state.task.dependency = option.id; return option.name; }}
                    filterOptions={filterOptions}
                    renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                  />
                </Grid> 
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    Criar Tarefa
                    
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

export default withStyles(styles)(withRouter(TaskCreate));