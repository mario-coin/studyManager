import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import Cloud from '@material-ui/icons/Cloud';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListIcon from '@material-ui/icons/List';
import Extension from '@material-ui/icons/Extension';
import Send from '@material-ui/icons/Send';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>
    <Link href="/kanban">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText>
          Kanban
        </ListItemText>
      </ListItem>
    </Link>
    <Link href="/task">
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText>
          Tarefas
        </ListItemText>
      </ListItem>
    </Link>
    <Link href="/gantt">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Gantt" />
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

// export const adminListItems = (
//   <div>
//     <ListSubheader inset>Administração</ListSubheader>
//     <Link href="/user">
//       <ListItem button>
//         <ListItemIcon>
//           <GroupIcon />
//         </ListItemIcon>
//         <ListItemText primary="Usuários" />
//       </ListItem>
//     </Link>
//   </div>
// );