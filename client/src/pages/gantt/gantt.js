import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../template/header';
import Grid from '@material-ui/core/Grid';
import Footer from '../../template/footer'
import { FrappeGantt } from 'frappe-gantt-react';
import api from '../../services/api';
import moment from "moment";
import "moment-timezone";

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
});

class Gantt extends React.Component {
    constructor(props) {
        super(props);
        this.ganttClick = this.ganttClick.bind(this);
        this.ganttDateChange = this.ganttDateChange.bind(this);
        // this.ganttProgressChange = this.ganttProgressChange.bind(this);
        this.ganttTasksChange = this.ganttTasksChange.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);

        this.state = {
            open: false,
            tasks: [
                {
                    id: '',
                    name: '',
                    start: '2016-12-28',
                    end: '2016-12-28',
                },
            ]
        };
    }
    
    componentDidMount() {
        this.fetchTasks();
    }
    
    fetchTasks = () => {
        let obj = [];
        api.get("/api/task/gantt", { params: {id: 0}})
        .then(
            (response) => {
                // console.log(response.data);
                response.data.tasks.forEach(o => {
                    obj.push({
                        id: `${o.id}`,
                        name: o.name,
                        start: moment(o.start_date).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:MM:SS"),
                        end: moment(moment(o.start_date).toDate().getTime() + (o.duration*60*60*1000)).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:MM:SS"),
                        dependencies: `${o.dependency}`,
                    });
                });
                // console.log(obj);
                this.setState({'tasks': obj });
            },
            (error) => {
                this.setState({'snackbarMessage': error.response.data });
            }
        );
    }

    ganttClick = (task) => {
        console.log("click");
        console.log(task);
    }

    ganttDateChange = (task, start, end) => {
        console.log("date change");
        console.log(task, start, end)
    }

    // ganttProgressChange = (task, progress) => {
    //     console.log("progress change");
    //     console.log(task, progress)
    // }

    ganttTasksChange = (tasks) => {
        console.log("tasks change");
        console.log(tasks)
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
                <Grid item xs={12}>
                    <FrappeGantt
                        tasks={this.state.tasks}
                        viewMode={'Day'}
                        onClick={this.ganttClick}
                        onDateChange={this.ganttDateChange}
                        // onProgressChange={this.ganttProgressChange}
                        onTasksChange={this.ganttTasksChange}
                        />
                </Grid>
                </Grid>
            </Grid>
            
            <Footer />
            </main>
        </div>
        );
    }
}

export default withStyles(styles)(Gantt);