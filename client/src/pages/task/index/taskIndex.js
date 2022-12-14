import React from 'react';
import { BrowserRouter, Route, Link  as LinkRouter, Switch} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../../template/header';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../../template/footer'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { TablePagination } from '@material-ui/core';
import TaskEdit from '../edit/taskEdit';
import taskDelete from '../delete/taskDelete';
import moment from "moment";
import "moment-timezone";
 
import api from '../../../services/api';
 
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
  filterContainer: {
    margin: theme.spacing(1),
  },
  filter: {
    width: '100%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
 
const Child = ({ match }) => console.log('match', match) || (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)
 
class TaskIndex extends React.Component {
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.search = this.search.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleRequestSort = this.handleRequestSort.bind(this);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
     
      this.state = {
        tasks: [],
        count: 0,
        filter: '',
        order: null,
        orderBy: null,
        rowsPerPage: 5,
        page: 0,
        snackbarMessage: ''
    };
  }

  /**
   * evento de pesquisa
   */
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState({[nam]: val});
    
    this.search(val, this.state.order, this.state.orderBy, this.state.rowsPerPage, this.state.page);
  }

  /**
   * consulta em banco
   */
  search = (filter, order, orderBy, rowsPerPage, page) => {
    api.get("/api/task/get", { params: {filter, order: order ?? 'asc', orderBy: orderBy ?? 'name', rowsPerPage, page }})
    .then(
      (response) => {
        this.setState({'tasks': response.data.tasks });
        this.setState({'count': response.data.count });
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }

  componentDidMount() {
    this.search(this.state.filter, this.state.order, this.state.orderBy, this.state.rowsPerPage, this.state.page);
  }

  /**
   * evento de ordena????o de coluna
   */
  handleRequestSort = (orderBy) => (event) => {
    const toAsc = this.state.orderBy === orderBy && this.state.order === 'desc';
    const order = toAsc ? 'asc' : 'desc';
    this.setState({'order':  order});
    this.setState({'orderBy': orderBy });

    this.search(this.state.filter, order, orderBy, this.state.rowsPerPage, this.state.page);
  };
  
  /**
   * evento de troca de p??gina
   */
  handleChangePage = (event, page) => {
    this.setState({'page': page });

    this.search(this.state.filter, this.state.order, this.state.orderBy, this.state.rowsPerPage, page);
  };

  /**
   * evento de atualiza????o do n??mero de itens por p??gina
   */
  handleChangeRowsPerPage = (event) => {
    let rowsPerPage = parseInt(event.target.value, 10);
    this.setState({'rowsPerPage': rowsPerPage });
    this.setState({'page': 0 });

    this.search(this.state.filter, this.state.order, this.state.orderBy, rowsPerPage, 0);
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
 
    this.setState({'snackbarMessage': '' });
  };
 
  render(){
    const { classes } = this.props;
    const headCells = [
      { id: 'name', label: 'Nome' },
      { id: 'start_date', label: 'Data in??cio' },
      { id: 'deadline', label: 'Prazo' },
      { id: 'complexity', label: 'Complexidade' },
      { id: 'duration', label: 'Dura????o' },
      { id: 'type', label: 'Tipo' },
    ];
   
    return (
      <div className={classes.root}>
        <Header />
 
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
         
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12}>
              <Paper align="center" className={classes.paper}>
                Tarefas
              </Paper>
            </Grid>
            <Grid item className={classes.filterContainer} xs={12}>
              <TextField className={classes.filter} id="filter" name="filter" label="Pesquisar" onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <Paper align="center" className={classes.paper}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {headCells.map((headCell) => (
                          <TableCell key={headCell.id} align='center' sortDirection={this.state.orderBy === headCell.id ? 'asc' : false} onClick={this.handleRequestSort(headCell.id)}>
                            <TableSortLabel
                              active={this.state.orderBy === headCell.id}
                              direction={this.state.orderBy === headCell.id
                                ? this.state.order
                                : 'asc'}>
                              {headCell.label}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                        <TableCell align="center">
                          <Link align="right" href="/task/create">
                            <AddIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.tasks.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                          <TableCell align="center">{moment(row.start_date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")}</TableCell>
                          <TableCell align="center">{moment(row.deadline).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:MM:SS")}</TableCell>
                          <TableCell align="center">{row.complexity}</TableCell>
                          <TableCell align="center">{row.duration}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">
                          <Switch>
                            <LinkRouter to={`/task/edit/${row.id}`}><EditIcon/></LinkRouter>
                            <Route path="/task/edit/:id" component={(props) => <TaskEdit id={props.match.params.id} ></TaskEdit>}></Route>
                          </Switch>
                          <Switch>
                            <LinkRouter to={`/task/delete/${row.id}`}><DeleteIcon onClick={`/task/delete/${row.id}`}/></LinkRouter>
                            <Route path="/task/delete/:id" component={(props) => <taskDelete id= {props.match.params.id}></taskDelete>}/>
                          </Switch>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[1, 5, 10, 25]} component="div" count={this.state.count} rowsPerPage={this.state.rowsPerPage} page={this.state.page} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
              </Paper>
            </Grid>
          </Grid>
         
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
         
          <Footer />
        </main>
      </div>
    );
  }
}
 
export default withStyles(styles)(TaskIndex);