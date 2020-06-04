import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../template/header';
import Grid from '@material-ui/core/Grid';
import Footer from '../../template/footer'
import { FrappeGantt } from 'frappe-gantt-react';

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
        this.ganttProgressChange = this.ganttProgressChange.bind(this);
        this.ganttTasksChange = this.ganttTasksChange.bind(this);

        this.state = {
            open: false
        };
    }

    ganttClick = (task) => {
        console.log("click");
        console.log(task);
    }

    ganttDateChange = (task, start, end) => {
        console.log("date change");
        console.log(task, start, end)
    }

    ganttProgressChange = (task, progress) => {
        console.log("progress change");
        console.log(task, progress)
    }

    ganttTasksChange = (tasks) => {
        console.log("tasks change");
        console.log(tasks)
    }
    
    render(){
        const { classes } = this.props;
        const tasks = [
            {
            id: 'Task 1',
            name: 'Redesign website1',
            start: '2016-12-28',
            end: '2016-12-31',
            progress: 80,
            },
            {
            id: 'Task 2',
            name: 'Redesign website2',
            start: '2017-01-04',
            end: '2017-01-07',
            progress: 40,
            dependencies: 'Task 1'
            },
            {
            id: 'Task 3',
            name: 'Redesign website3',
            start: '2017-01-08',
            end: '2017-01-12',
            progress: 20,
            dependencies: 'Task 1, Task 2'
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
            {
            id: 'Task 4',
            name: 'Redesign website',
            start: '2016-12-30',
            end: '2017-01-08',
            progress: 20,
            },
        ]
    
        return (
        <div className={classes.root}>
            <Header />

            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            
            <Grid container justify="center" className={classes.root}>
                <Grid container justify="center">
                <Grid item xs={12}>
                    <FrappeGantt
                        tasks={tasks}
                        viewMode={'Day'}
                        onClick={this.ganttClick}
                        onDateChange={this.ganttDateChange}
                        onProgressChange={this.ganttProgressChange}
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