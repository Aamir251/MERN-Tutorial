import React, { useState, useEffect } from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { loadGoogleScript } from '../../GoogleLogin.js'



const Auth = () =>{
  const state = null;
  const classes = useStyles();
  const [isSignup, setIsSignup ] = useState(false);
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const googleClientId = "694057039560-4fl8ra3oubdrmfm4p5qn7787bmk36lhp.apps.googleusercontent.com"

  const onSuccess = (googleUser) => { // (Ref. 7)
    setIsLoggedIn(true);
    console.log(googleUser);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };

  const onFailure = () => {
    setIsLoggedIn(false);
  }

  const logOut = () => { // (Ref. 8)
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };

  const renderSigninButton = (_gapi) => { // (Ref. 6)
    // _gapi.signin2.render('google-signin', {
    //   'scope': 'profile email',
    //   'width': 240,
    //   'height': 50,
    //   'longtitle': true,
    //   'theme': 'dark',
    //   'onsuccess': onSuccess,
    //   'onfailure': onFailure
    // });
  }

  useEffect(() => {

    // Window.gapi is available at this point
    window.onGoogleScriptLoad = () => { // (Ref. 1)

      const _gapi = window.gapi; // (Ref. 2)
      setGapi(_gapi);

      _gapi.load('auth2', () => { // (Ref. 3)
        (async () => {
          const _googleAuth = await _gapi.auth2.init({ // (Ref. 4)
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth); // (Ref. 5)
          renderSigninButton(_gapi); // (Ref. 6)
        })();
      });
    }

    // Ensure everything is set before loading the script
    loadGoogleScript(); // (Ref. 9)

  }, []);
  const updateSigninStatus = ()=> {

  }


  const handleSubmit = () => {

  }
  const handleChange = () => {

  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    console.log(res);
    try {
      // dispatch({
      //   type : 'AUTH',
      //   data : {result, token }
      // })
      //
      // history.push("/")
    } catch (e) {
      console.error(e);
    }
  }
  const googleError = (error) => {
    console.error(error);
    console.log("Sign In Unsuccessful");
  }
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }
  const handleShowPassword = () => setShowPassword(!showPassword);

  return <Container component='main' maxWidth='xs'>
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
        <Typography variant='h5' >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
              )}

              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          {!isLoggedIn &&
            <GoogleLogin
              clientId={googleClientId}
              accessType = "offline"
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}  variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
            />
        }

        {isLoggedIn &&
          <div>
            <div>
              <img src={imageUrl} />
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <button className='btn-primary' onClick={logOut}>Log Out</button>
          </div>
        }

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
    </Paper>
  </Container>
}

export default Auth;
