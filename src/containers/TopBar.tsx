import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Hidden,
  Typography,
  Button,
  CircularProgress,
  IconButton
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { navigate } from '@reach/router'
import { login, logout } from './Firebase'
import { useAuthContext, IAuthUser } from '../contexts/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  topBar: {
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default () => {
  const classes = useStyles()
  const { auth } = useAuthContext()
  const { user, initialising } = auth
  const [loading, setLoading] = useState(false)

  const gotoHome = () => {
    navigate('/')
  }
  const handleLogin = () => {
    setLoading(true)
    login()
  }

  const renderLoading = () => <CircularProgress color="secondary" />
  const renderUser = (user: IAuthUser) => {
    return (
      <>
        <Typography variant="body1" className={classes.title}>
          {user.email}
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </>
    )
  }
  const renderLogin = () => (
    <Button color="inherit" onClick={handleLogin}>
      Login
    </Button>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.topBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={gotoHome}
          >
            <HomeIcon />
          </IconButton>
          <Hidden xsDown>
            <Typography variant="h6" className={classes.title}>
              Keepract
            </Typography>
          </Hidden>
          <div>
            {initialising || loading
              ? renderLoading()
              : user
              ? renderUser(user)
              : renderLogin()}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
