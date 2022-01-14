import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../assets/tolds-logo.svg'

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3rem',
  },
  appbar: {
    borderBottom: '1px solid #e5e5e5',
    background: '#fff',
  },
  logo: {
    height: '3em',
  },
}))

function Header() {
  const classes = useStyles()
  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <img className={classes.logo} alt="Toldst logo" src={logo} />
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}

export default Header
