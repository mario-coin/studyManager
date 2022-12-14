import React from 'react';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import Header from '../../template/header';
import Chat from '@material-ui/icons/Chat';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../template/footer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import moment from "moment";
import "moment-timezone";
 
import api from '../../services/api';
import { TextareaAutosize } from '@material-ui/core';
 
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
 
class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.pendenteCard = this.pendenteCard.bind(this);
      this.desenvolvendoCard = this.desenvolvendoCard.bind(this);
      this.concluidoCard = this.concluidoCard.bind(this);
      this.findTaskBy = this.findTasksBy.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.myRef = React.createRef();
 
      this.state = {
        tasks: [],
        count: 0,
        filter: '',
        order: null,
        orderBy: null,
        rowsPerPage: 5,
        page: 0,
        snackbarMessage: '',
        pendentes: [],
        desenvolvendo: [],
        concluido: [],
    };
  }
 
  componentDidMount() {
    this.search(this.state.filter, this.state.order, this.state.orderBy, this.state.rowsPerPage, this.state.page);
  }
 
  search = (filter, order, orderBy, rowsPerPage, page) => {
    api.get("/api/task/get", { params: {filter, order: order ?? 'asc', orderBy: orderBy ?? 'name', rowsPerPage, page }})
    .then(
      (response) => {
        this.setState({'tasks': response.data.tasks });
        this.setState({'pendentes': this.findTasksBy('pendente')});
        this.setState({'desenvolvendo': this.findTasksBy('desenvolvendo')});
        this.setState({'concluido': this.findTasksBy('concluido')});
        this.setState({'count': response.data.count });
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let task = null;
    for(var i = 0; i < this.state.tasks.length; i++){
      if(this.state.tasks[i].id === name){
        task = this.state.tasks[i];
      }
    }
    task.situation = value;
    api.put('/api/task/edit/' + name, task)
    .then(
      (response) => {
        window.location.reload(true);
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    )
  }

  findTasksBy(taskSituation){
    const { classes } = this.props;
    const aux = [];
    for(var i = 0; i < this.state.tasks.length; i++){
      if(this.state.tasks[i].situation === taskSituation ){
        aux.push(this.state.tasks[i]);
      }
    }
    return aux;
  }

  pendenteCard(){
    const { classes } = this.props;
    const bull = <span c-lassName={classes.bullet}>???</span>;
 
    return(
      this.state.pendentes.map((row, index) => (
      <Card className={classes.card}>
          <CardContent key={index}>
            <Typography variant="h5" component="h2">
              {row.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Entrega: {moment(row.deadline).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Tipo: {row.type}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Complexidade: {row.complexity}
            </Typography>
            <InputLabel>Situa????o</InputLabel>
              <Select name={row.id} value={row.situation} onChange={this.handleChange}>
                <MenuItem value='pendente'>Pendente</MenuItem>
                <MenuItem value='desenvolvendo'>Desenvolvendo</MenuItem>
                <MenuItem value='concluido'>Conclu??do</MenuItem>
              </Select>
        </CardContent>
        </Card>
      ))
    );
  }

  desenvolvendoCard(){
    const { classes } = this.props;
    const bull = <span c-lassName={classes.bullet}>???</span>;
 
    return(
      this.state.desenvolvendo.map((row, index) => (
      <Card className={classes.card}>
          <CardContent key={index}>
            <Typography variant="h5" component="h2">
              {row.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Entrega: {moment(row.deadline).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Tipo: {row.type}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Complexidade: {row.complexity}
            </Typography>
            <form>
            <Select name={row.id} value={row.situation} onChange={this.handleChange}>
                <MenuItem value='pendente'>Pendente</MenuItem>
                <MenuItem value='desenvolvendo'>Desenvolvendo</MenuItem>
                <MenuItem value='concluido'>Conclu??do</MenuItem>
              </Select>
            </form>
        </CardContent>
        </Card>
      ))
    );
  }
 
  concluidoCard(){
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>???</span>;
 
    return(
      this.state.concluido.map((row, index) => (
      <Card className={classes.card}>
          <CardContent key={index}>
            <Typography variant="h5" component="h2">
              {row.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Entrega: {moment(row.deadline).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Tipo: {row.type}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Complexidade: {row.complexity}
            </Typography>
            <form>
            <Select name={row.id} value={row.situation} onChange={this.handleChange}>
                <MenuItem value='pendente'>Pendente</MenuItem>
                <MenuItem value='desenvolvendo'>Desenvolvendo</MenuItem>
                <MenuItem value='concluido'>Conclu??do</MenuItem>
              </Select>
            </form>
        </CardContent>
        </Card>
      ))
    );
  }
 
  render(){
    const { classes } = this.props;
 
    return (
        <div className={classes.root}>
          <Header />
  
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
          
            <Grid container justify="center" className={classes.root}>
              <Grid container justify="center">
                <Grid item xs={4}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Paper align="center" className={classes.paper}>Pendente</Paper>
                    </Grid>
                    <Grid item>
                      {this.pendenteCard()}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Paper align="center" className={classes.paper}>Desenvolvendo</Paper>
                    </Grid>
                    <Grid item>
                      {this.desenvolvendoCard()}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Paper align="center" className={classes.paper}>Conclu??do</Paper>
                    </Grid>
                    <Grid item>
                      {this.concluidoCard()}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          
            <Footer />
          </main>
        </div>
    );
  }
}
 
export default withStyles(styles)(Dashboard);