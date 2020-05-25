import React, {Component} from 'react';
import { useToasts } from 'react-toast-notifications'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import Toastpop from './Toast';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://192.168.0.106:3000">
          Shubham's Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
class Auth extends Component {
  constructor(){
    super()
    this.state = {
      isRegister:false,
      toast: true,
      ToastHeader:"",
      ToastBody:"",
      loginError: false,
      loginMessage:""
    }
  }
    login(){   
        const form ={email:this.state.email,
            password: this.state.password}
            localStorage.setItem("email", this.state.email);
        fetch('http://192.168.0.106:8080/api/user/login',
      {
        method:"POST",
        headers: { 'Content-Type': 'application/json'},
        body:JSON.stringify(form)
      })
      .then(response => {
        if(response.status === 200){
          this.setState({loginError:false})
          return response.json();
      }else {
        this.setState({loginError:true});
        return response.json();
      }
    })
      .then(responseJson => {
        if(this.state.loginError === true) {
         this.setState({loginMessage:responseJson.error})
        }else{
        localStorage.setItem("auth", JSON.stringify(responseJson.token))
        localStorage.setItem("name", responseJson.name)
        localStorage.setItem("username", responseJson.username)
        this.setState({toast:true, 
                      ToastHeader:"LoggedIn" ,
                      ToastBody: "Logged In Successfully",
                      loginError:false,
                      loginMessage:""})
        }
      })  
        .catch((error) => {
          console.log(error)
        })
    }
    register(){    
      console.log(this.state)
      const registerForm =
      { name:this.state.name,
        username:this.state.username,
        email:this.state.email,
        contact:this.state.contact,
        password: this.state.password
      }
      fetch('http://192.168.0.106:8080/api/user/register',
    {
      method:"POST",
      headers: { 'Content-Type': 'application/json'},
      body:JSON.stringify(registerForm)
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      if(responseJson.name !== ''){
        this.setState({isRegister: false})
      }
    })
    .catch((error) => {
      // console.log(error)
    })
  
  }
    render() {    
      if(localStorage.getItem("auth") !== null && localStorage.getItem("auth") !== "null" && localStorage.getItem("auth") !== undefined){
        var auth = JSON.stringify(localStorage.getItem("auth"));
        }else{
          // this.setState({isRegister: false})
            auth = null;
        }        
        return (
<div>
<div>
          <Toast onClose={() => {this.setState({loginError:false})}} show={this.state.loginError} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">{this.state.loginMessage}</strong>
          </Toast.Header>
          <Toast.Body>Please Try again</Toast.Body>
        </Toast>
        </div>
        <div>
                  {
                  auth ? <Redirect to="home"></Redirect> : null
                  }
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      { 
      !(this.state.isRegister)
            ?
      <div className={useStyles.paper}>
        <Avatar className={useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* <form className={useStyles.form} noValidate> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {this.setState({email:e.target.value})}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {this.setState({password:e.target.value})}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={() => this.login()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className="navColor" href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className="navColor" href="#" variant="body2" onClick={() => this.setState({isRegister: true})}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        {/* </form> */}
      </div>
        :
      <div className={useStyles.paper}>
        <Avatar className={useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* <form className={useStyles.form} noValidate> */}
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {this.setState({email:e.target.value})}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {this.setState({password:e.target.value})}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={(e) => {this.setState({name:e.target.value})}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="username"
            id="username"
            autoComplete="username"
            onChange={(e) => {this.setState({username:e.target.value})}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contact"
            label="contact"
            name="contact"
            autoComplete="contact"           
            onChange={(e) => {this.setState({contact:e.target.value})}}
          />
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}s
            onClick={() => this.register()}
          >
            Sign Up
          </Button>
          <Link className="navColor" href="#" variant="body2" onClick={() => this.setState({isRegister: false})}>
                {"Go back to Login Page"}
              </Link>
        {/* </form> */}
      </div>
    }
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    </div>
        );
    }
}

export default Auth;