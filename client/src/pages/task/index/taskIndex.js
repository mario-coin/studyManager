import React from 'react';
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
  }
});

class TaskIndex extends React.Component {
  constructor(props) {
      super(props);

      this.handleClose = this.handleClose.bind(this);
      this.handleRequestSort = this.handleRequestSort.bind(this);
      
      this.state = {
        tasks: [],
        order: 'desc',
        orderBy: 'name',
        snackbarMessage: ''
    };
  }

  componentDidMount() {
    api.get("/api/task/get")
    .then(
      (response) => {
        this.setState({'tasks': response.data });
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }

  handleRequestSort = (property) => (event) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({'order': isAsc ? 'desc' : 'asc' });
    this.setState({'orderBy': property });
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
      { id: 'start_date', label: 'Data início' },
      { id: 'deadline', label: 'Prazo' },
      { id: 'complexity', label: 'Complexidade' },
      { id: 'duration', label: 'Duração' },
      { id: 'type', label: 'Tipo' },
    ];
    
    return (
      <div className={classes.root}>
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          
          <Grid container justify="center" className={classes.root}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Paper align="center" className={classes.paper}>
                  Tarefas
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper align="center" className={classes.paper}>
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell key={headCell.id} align='center' sortDirection={this.state.orderBy === headCell.id ? this.state.order : false} onClick={this.handleRequestSort(headCell.id)}>
                              <TableSortLabel active={this.state.orderBy === headCell.id} direction={this.state.orderBy === headCell.id ? this.state.order : 'asc'}>
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
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.start_date}</TableCell>
                            <TableCell align="center">{row.deadline}</TableCell>
                            <TableCell align="center">{row.complexity}</TableCell>
                            <TableCell align="center">{row.duration}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">
                              <Link align="right" href="/task/edit">
                                <EditIcon />
                              </Link>
                              <Link align="right" href="/task/delete">
                                <DeleteIcon />
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
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