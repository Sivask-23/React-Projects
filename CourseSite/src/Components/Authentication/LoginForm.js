import React, { useState } from 'react'
import '../../ComponentsCss/Authentication/LoginForm.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { userLogin } from '../../APIServices/Authentication/UserLogin';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
 
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate();

  const {loginCall}=useAuth();

  const [loginDetails, setLoginDetails]=useState({
    username:'',
    password:''
  });

  const handleSubmitButton=async(event)=>{
    event.preventDefault();
    if (loginDetails.username && loginDetails.password) {
      const response = await userLogin(loginDetails);
      if (loginDetails) {
        console.log(loginDetails);
      }
      console.log(response);
      if (response.status===200) {
        
        sessionStorage.setItem("userToken",response.data?.token)
        loginCall();
        alert("Login succesfull !!!")
        setLoginDetails({
          username: '',
          password: '',
        });
        setTimeout(()=>{
          navigate('/user/land')
        },1000)
      }else{
        alert(response.messages.error);
      }
    }else{
      alert("fill all details")
    }
  }

  const handleUpdate=(attribute,value)=>{
    setLoginDetails((prev)=>
      ({...prev,[attribute]:value}));
    if (loginDetails) {
      console.log(loginDetails);
    }
  };

  const handleClickShowPassword = () =>{ 
      console.log("clicked")
      setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

return (
  <div className='outer-login' style={{ backgroundImage: `url(${require('../../Assets//innerbg1.jpg')})` }}>
      <div className='outer-log' >
        <img src={require('../../Assets/logepageinner.png')} alt="poster" className='outImg'/>
        <div className='outer-log-poster' style={{ backgroundImage: `url(${require('../../Assets/outerbg.jpg')})` }}>
          <div className='outerlogPost' >
            <img src={require('../../Assets/welcomeGirl.png')} alt="welcome"/>
          </div>
        </div>
      <div className='inner-log'  >
      
      <div className='log-title'>
      <img src={require('../../Assets/user1.png')} alt="logo" />
      </div>

        <div className='log-content'>
            <form onSubmit={(e)=>handleSubmitButton(e)}>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='box'>
                <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                    <PersonIcon sx={{ fontSize: 30, color: 'blue', mr: 1 }} />
                    <TextField
                    fullWidth
                    id="username-field"
                    label="Username"
                    variant="outlined"
                    type='text'
                    className="custom-textfield"
                    value={loginDetails.username}
                    onChange={(e)=>{handleUpdate('username',e.target.value)}}
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="box">
                <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                    <KeyIcon sx={{ fontSize: 30, color: 'blue', mr: 1 }} />
                    <TextField
                    fullWidth
                    id="password-field"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    className="custom-textfield"
                    value={loginDetails.password}
                    onChange={(e)=>{handleUpdate('password',e.target.value)}}
                    slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end" >
                              <IconButton
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                sx={{color:'black'}}
                                
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='box'>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                    <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} variant="contained" className='submit-btn' type='submit'>Login</Button>
                </Box>
            </Box>
            <div className='signup-bar'>
              <p>Don't have an account? <b><a href="/Register">Signup</a></b></p>
            </div>

            </form>
        </div>
    </div>
      </div>
  </div>
)
}

export default LoginForm