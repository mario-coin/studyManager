import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import api from '../services/api';


class Notification extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      notifications: [],
      pop_open: false
    }
	}

  handleRequestOpen(e) {
		e.preventDefault();
		this.setState({
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
    
      loadNotifications = async () => {
        const response = await api.get("/notification")
        this.setState({notifications: response.data.notifications})
        console.log(response);
      }

  render() {    
    return (
      <div>
          <IconButton aria-label="show 17 new notifications" color="inherit" onClick={this.handleRequestOpen.bind(this)}>
            <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
          </IconButton>
            <Popover
			          open={this.state.pop_open}
			          anchorEl={this.state.anchorEl}
			          className="popover_class"
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onClose={this.handleRequestClose.bind(this)}
			      >
            {this.state.notifications.map((notification) => (
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItemText primary={notification.title} />
              <ListItemText primary={notification.description} />
              <ListItemText primary={notification.type} />
            </List>
            ))}
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItemText primary="Teste" />
            </List>
			</Popover>
      </div>
    );
  }
}

export default (Notification);