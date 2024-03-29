import React,{ useState, useEffect } from 'react';
import {Typography, AppBar, Avatar, Toolbar, Button} from "@material-ui/core"
import useStyles from './styles'
import {Link, useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import memories from '../../images/memories.png'
const Navbar = () => {

  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[]);

  const logout = () => {
    dispatch({
      type : "LOGOUT"
    })
    setUser(null)
    history.push("/")
  }

  return <AppBar className={ classes.appBar } position="static" color="inherit">
      {/* Typography is any textual element */}
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" variant='h2' align='center' >Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60'/>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt[0]}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>LogOut</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
        )}
      </Toolbar>
  </AppBar>
}

export default Navbar;
