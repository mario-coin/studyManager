import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Cloud from '@material-ui/icons/Cloud';
import BarChartIcon from '@material-ui/icons/BarChart';
import Extension from '@material-ui/icons/Extension';
import Send from '@material-ui/icons/Send';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText>
          Kanban
        </ListItemText>
      </ListItem>
    </Link>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Gráficos" />
      </ListItem>
    </Link>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <CalendarToday />
        </ListItemIcon>
        <ListItemText primary="Agenda" />
      </ListItem>
    </Link>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <Cloud />
        </ListItemIcon>
        <ListItemText primary="Repositório" />
      </ListItem>
    </Link>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <Extension />
        </ListItemIcon>
        <ListItemText primary="Integração" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Grupos</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      <ListItemText primary="Chat 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      <ListItemText primary="Chat 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      <ListItemText primary="Chat 3" />
    </ListItem>
  </div>
);