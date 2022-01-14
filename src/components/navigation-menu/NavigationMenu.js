import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography
} from '@material-ui/core'
import {
  ExpandLess,
  ExpandMore,
  NavigateNext,
  SupervisorAccount
} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {
  externalNavigationComponents,
  mainNavComponents,
  superbrugerNavigationComponents,
  superbrugerToldrapportNavigationComponents,
} from '../../Constants'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 280,
    borderTop: '1px solid #e5e5e5',
  },
  submenu: {
    '&::before': {
      content: '""',
      display: 'block',
      width: '3.75rem',
      height: '1rem',
      background: '#14143c',
      position: 'relative',
      left: 30,
      top: -3.5,
    }
  },
  menulist: {
    paddingLeft: 15,
  },
  nestedMenulist: {
    paddingLeft: 15,
  },
  listItemIcon: {
    minWidth: 40,
  }
}))

const MainNavigationComponents = () => {
  const classes = useStyles();
  return mainNavComponents.map(({label, path, menuIcon}) => (
      <div key={label}>
        <MenuItem component={Link} to={path}>
          <ListItemIcon className={classes.listItemIcon}>
            {menuIcon}
          </ListItemIcon>
          <ListItemText>
            <Typography variant='inherit'>{label}</Typography>
          </ListItemText>
        </MenuItem>
      </div>
  ))
}

const ExternalNavigations = () => {
  const classes = useStyles();
  return externalNavigationComponents.map(({label, path, menuIcon}) => (
      <div key={label}>
        <MenuItem onClick={() => window.open(path)}>
          <ListItemIcon className={classes.listItemIcon}>
            {menuIcon}
          </ListItemIcon>
          <ListItemText>
            <Typography variant='inherit'>{label}</Typography>
          </ListItemText>
        </MenuItem>
      </div>
  ))
}

const SuperBrugerNavigation = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openToldrapport, setOpenToldrapport] = React.useState(false)

  const handleExpandablePanel = () => {
    setOpen(!open)
  }

  const handleExpandablePanelToldrapport = () => {
    setOpenToldrapport(!openToldrapport)
  }

  return (
      <>
        <MenuItem button onClick={handleExpandablePanel}>
          <ListItemIcon className={classes.listItemIcon}>
            <SupervisorAccount/>
          </ListItemIcon>
          <ListItemText>
            <Typography variant='inherit'>Superbruger</Typography>
          </ListItemText>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </MenuItem>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <MenuList className={classes.nestedMenulist}>
            {superbrugerNavigationComponents.map(({label, path, menuIcon}) => (
                <MenuItem key={label} component={Link} to={path}>
                  <ListItemIcon className={classes.listItemIcon}>
                    {menuIcon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant='inherit'>{label}</Typography>
                  </ListItemText>
                  <Divider/>
                </MenuItem>
            ))}

            <MenuItem button className={classes.nestedMenulist} onClick={handleExpandablePanelToldrapport}>
              <ListItemIcon className={classes.listItemIcon}>
                {<NavigateNext/>}
              </ListItemIcon>
              <ListItemText>
                <Typography variant='inherit'>Toldrapport</Typography>
              </ListItemText>
              {openToldrapport ? <ExpandLess/> : <ExpandMore/>}
            </MenuItem>

            <Collapse in={openToldrapport} timeout='auto' unmountOnExit>
              <MenuList className={classes.nestedMenulist}>
                {superbrugerToldrapportNavigationComponents.map(({label, path, menuIcon}) => (
                    <MenuItem key={label} component={Link} to={path}>
                      <ListItemIcon className={classes.listItemIcon}>
                        {menuIcon}
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='inherit'>{label}</Typography>
                      </ListItemText>
                      <Divider/>
                    </MenuItem>
                ))}
              </MenuList>
            </Collapse>

          </MenuList>
        </Collapse>
      </>
  )
}

const NavigationMenu = () => {
  const classes = useStyles();
  return (
      <Paper elevation={0} className={classes.root} square>
        <span className={classes.submenu}/>
        <MenuList className={classes.menulist}>
          <MainNavigationComponents/>
          <ExternalNavigations/>
          <SuperBrugerNavigation/>
        </MenuList>
      </Paper>
  )
}

export default NavigationMenu
