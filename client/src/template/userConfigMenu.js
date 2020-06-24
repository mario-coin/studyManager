import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import EmailIcon from '@material-ui/icons/Email';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const styles = (theme) => ({
  typography: {
    padding: theme.spacing(1),
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class UserConfigMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  deleteTokenClient(){
    localStorage.clear();
    window.location.href = "/";
  }

  render() {    
    const { classes } = this.props;
    return (
      <div>
          <IconButton color="inherit" onClick={this.handleRequestOpen.bind(this)}>
            <AccountCircle />
          </IconButton>
            <Popover
			        open={this.state.pop_open}
			        anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              onClose={this.handleRequestClose.bind(this)}
			      >
              <List component="nav" aria-label="main mailbox folders">
                <ListItemLink button href="/user/editProfile">
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                    <ListItemText primary="Alterar nome e email"></ListItemText>
                </ListItemLink>
                <Divider/>
                <ListItemLink button href="/forgot">
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Alterar senha" />
                </ListItemLink>
                <Divider/>
                <ListItemLink button href="/task/configTask">
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Alterar configurações de notificação" />
                </ListItemLink>
                <Divider/>
                <ListItem button>
                  <ListItemIcon>
                    <SettingsPowerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" onClick={this.deleteTokenClient.bind(this)}/>
                </ListItem>
              </List>
			</Popover>
      </div>
    );
  }
}

export default withStyles(styles)(UserConfigMenu);