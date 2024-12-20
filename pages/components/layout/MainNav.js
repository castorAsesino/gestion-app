import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';;
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '../../../src/Link';
import { useRouter } from 'next/router';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import BarChartIcon from '@material-ui/icons/BarChart';
import Container from '@material-ui/core/Container';
const drawerWidth = 270;
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListIcon from '@material-ui/icons/List';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  title: {
    flexGrow: 1,
  },
  appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.leavingScreen,
     }), 
    
    background: '#4576e0'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

  },
  colornav:{
    background: "#4576e0",
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  }

  const routes = [
    {
      id: 1,
      label: 'Inicio',
      path: '/',
      icon: HomeIcon
    },
    {
      id: 6,
      label: 'Proyectos',
      path: '/proyecto',
      icon: LibraryBooks
    },
   
    {
      id: 2,
      label: 'Procesos',
      path: '/proceso',
      icon: AllInboxIcon
    },
    {
      id: 3,
      label: 'Atributo de Proceso',
      path: '/atributos',
     
      icon: MenuIcon
    },
    {
      id: 4,
      label: 'Niveles',
      path: '/niveles',
      icon: EqualizerIcon
    }, 

    {
      id: 5,
      label: 'Escalas',
      path: '/escalas',
      icon: ListIcon
    },
    {
      id: 6,
      label: 'Evaluar Calidad',
      path: '/evaluacion-calidad',
      icon: LibraryBooks
    },
    {
      id: 6,
      label: 'Evaluar Capacidad',
      path: '/evaluacion-capacidad',
      icon: LibraryBooks
    },
    {
      id: 6,
      label: 'Reportes',
      path: '/reportes',
      icon: BarChartIcon
    }

  ]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"

        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />

          </IconButton>
          {/*  <Typography variant="h6" className={classes.title}>gestion-app v0.0</Typography>                    
          <Button color="inherit" component={Link} href="/register">Register</Button>     
          <Button color="inherit" component={Link} href="/login">Login< /Button>     */}

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} style={{  background: "#4576e0", color: "#fff", }}>
          <Typography variant="h6" className={classes.title}></Typography>
          <IconButton onClick={handleDrawerClose} style={{  color: "#fff", }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </div>
        <Divider />
        <List>
          {routes.map((item, index) => (
            <Link href={item.path} style={{ textDecoration: 'none', color: 'black' }} key={index}>
              <MenuItem selected={activeRoute(item.path, router.pathname)}>
                <ListItem button key={index}  >
                  <ListItemIcon> <item.icon /> </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </MenuItem>
            </Link>
          ))}
        </List>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container maxWidth="xl">
          {props.mainPage}
        </Container>

      </main>
    </div>
  );
}