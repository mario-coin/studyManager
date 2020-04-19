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
import Footer from '../../template/footer'

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
      this.defaultCard = this.defaultCard.bind(this);

      this.state = {
          open: false
      };
  }
  
  defaultCard(){
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return(
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
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
                    {this.defaultCard()}
                    {this.defaultCard()}
                    {this.defaultCard()}
                    {this.defaultCard()}
                    {this.defaultCard()}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={1}>
                <Divider orientation="vertical" flexItem />
              </Grid> */}
              <Grid item xs={4}>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <Paper align="center" className={classes.paper}>Desenvolvendo</Paper>
                  </Grid>
                  <Grid item>
                    {this.defaultCard()}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={1}>
                <Divider orientation="vertical" flexItem />
              </Grid> */}
              <Grid item xs={4}>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <Paper align="center" className={classes.paper}>Concluído</Paper>
                  </Grid>
                  <Grid item>
                    {this.defaultCard()}
                    {this.defaultCard()}
                    {this.defaultCard()}
                    {this.defaultCard()}
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