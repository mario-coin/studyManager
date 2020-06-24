import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import api from '../services/api';

const styles = (theme) => ({
  typography: {
    padding: theme.spacing(1),
  }
});

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.loadNotifications = this.loadNotifications.bind(this);
    this.state = {
      notifications: [],
      pop_open: false
    }
	}

  handleRequestOpen(e) {
		e.preventDefault();
		this.setState({
      //notifications: [],
			pop_open: !this.state.pop_open,
			anchorEl: e.currentTarget,
		});
	}

	handleRequestClose() {
    	this.setState({
      		pop_open: false,
    	});
    };

  componentDidMount() {
    this.loadNotifications();
  }
    
  loadNotifications = () => {
    api.get("/api/notification/get")
    .then(
      (response) => {
        this.setState({'notifications': response.data.notifications });
      },
      (error) => {
        this.setState({'snackbarMessage': error.response.data });
      }
    );
  }

  findNotificationsNotViewed(){
    const notViewed = [];
    for(var i = 0; i < this.state.notifications.length; i++){
      if(this.state.notifications[i].viewed === false){
        notViewed.push(this.state.notifications[i]);
      }
    }
    return notViewed;
  }

  render() {    
    const { classes } = this.props;
    return (
      <div>
          <IconButton aria-label="show 17 new notifications" color="inherit" onClick={this.handleRequestOpen.bind(this)}>
            <Badge badgeContent={this.findNotificationsNotViewed().length} color="secondary">
                <NotificationsIcon />
            </Badge>
          </IconButton>
            <Popover
			          open={this.state.pop_open}
			          anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onClose={this.handleRequestClose.bind(this)}
			      >
            {this.state.notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <Typography className={classes.typography}>Tarefa: {notification.title}</Typography>
              <Typography className={classes.typography}>Descrição: {notification.description}</Typography>
              <Typography className={classes.typography}>Tipo: {notification.type}</Typography>
              <Divider />
            </React.Fragment>
            ))}
			</Popover>
      </div>
    );
  }
}

export default withStyles(styles)(Notification);