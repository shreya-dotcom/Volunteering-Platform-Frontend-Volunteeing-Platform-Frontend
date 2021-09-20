import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Box, Tooltip, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Admincomp from './Admin';
import Leadercomp from './Leadercomp';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import HHicon from './HH-icon.ico';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    // keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));



export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let history = useHistory();
  const handleSignout = () => {
    setAnchorEl(null);
    history.push('/');

  };
  const handleAdminpg = () => {
    setAnchorEl(null);
    history.push('/Adminmainpg');

  };
  const handleLeader = () => {
    setAnchorEl(null);
    history.push('/Leader');

  };

  const handleProfile = () => {
    setAnchorEl(null);
    history.push('/Profile');

  };
  const handleDash = () => {
    setAnchorEl(null);
    history.push('/Dashboard');

  };
  const goHome = () => {

    history.push('/apphome');

  };

  const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
  console.log(dataInfo.firstname)
  const role = dataInfo.roles
  const admin = "ADMIN"
  const leader = "LEADER"

  return (
    <Box mb={10}>
      <div className={classes.root}>
        
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar style={{ height: 60, backgroundColor: '#199bf1' }}>

            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <img src={HHicon} alt="logo" height="50" width="50" align="center" />
                &nbsp;&nbsp;Helping Hands
              </Typography>
              {auth && (
                <div>
                
                  <Tooltip title="Go to Home page">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home" onClick={goHome}>
                      <HomeIcon />
                    </IconButton></Tooltip>
                  <Button onClick={handleMenu} startIcon={<AccountCircleIcon />} endIcon={<ArrowDropDownIcon />} size="large" style={{ fontSize: 15, textTransform: 'none', color: 'white' }} >
                    {/* <ListItemText>*/}
                    <Typography >&nbsp;&nbsp;{dataInfo.firstname}&nbsp;{dataInfo.lastname}&nbsp;</Typography> </Button>
                  <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                  
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><PersonIcon /></ListItemIcon>
                          <ListItemText>
                            Profile
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                    <MenuItem onClick={handleDash}>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><DashboardIcon /></ListItemIcon>
                          <ListItemText>
                            Dashboard
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                    
                    {role === admin ? <MenuItem onClick={handleAdminpg}><Admincomp /></MenuItem> : null}
                    {role === leader ? <MenuItem onClick={handleLeader}><Leadercomp /></MenuItem> : null}
                    <MenuItem onClick={handleSignout}>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><ExitToAppIcon /></ListItemIcon>
                          <ListItemText>
                            Signout
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                  </StyledMenu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </div>
    </Box>
  );
}
