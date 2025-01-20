import React, { useState } from 'react'
import '../../ComponentsCss/Authentication/RegForm.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { userRegistration } from '../../APIServices/Authentication/UserRegistration';
import { useNavigate } from 'react-router-dom';


const RegForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [userdetails, setUserdetails]=useState({
      username:'',
      email:'',
      mobile:'',
      password:''
    });

    const navigate=useNavigate();

    const validatePhoneNumber = (number) => {
      const phoneRegex = /^[0-9]\d{9}$/;
      return phoneRegex.test(number);
    };

    const handleSubmitButton = async (event) => {
      event.preventDefault();
    
      if (!validatePhoneNumber(userdetails.mobile)) {
        alert("Invalid phone number");
        return;
      }
    
      try {
        const response = await userRegistration(userdetails);
        console.log(userdetails);
        console.log(response?.status);
    
        if (response?.status === 201) {
          alert("user registered succesfully");
          setUserdetails({
            username: '',
            email: '',
            mobile: '',
            password: '',
          });
    
          // Navigate after a delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else if (response?.status === 400) {
          alert(response.messages?.error || "Bad Request");
        } else {
          alert("Unexpected error occurred. Please try again later.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again.");
      }
    };
    
    

    const handleUpdate=(attribute,value)=>{
      setUserdetails((prev)=>
        ({...prev,[attribute]:value}));
      if (userdetails) {
        console.log(userdetails);
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
    <div className='outer-reg' style={{ backgroundImage: `url(${require('../../Assets/outerbg1.jpg')})` }}>
        <div className='inner-reg'  style={{ backgroundImage: `url(${require('../../Assets/innerbg.jpg')})` }}>
          <div className='reg-title'>
          <img src={require('../../Assets/user1.png')} alt="logo" />
          </div>
            
            <div className='reg-content'>
                <form onSubmit={(e)=>handleSubmitButton(e)}>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='box'>
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                        <PersonIcon sx={{ fontSize: 30, color: 'black', mr: 1 }} />
                        <TextField
                        fullWidth
                        id="username-field"
                        label="Username"
                        variant="outlined"
                        type='text'
                        className="custom-textfield"
                        value={userdetails.username}
                        onChange={(e)=>{handleUpdate('username',e.target.value)}}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='box'>
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                        <EmailIcon sx={{ fontSize: 30, color: 'black', mr: 1 }} />
                        <TextField
                        fullWidth
                        id="email-field"
                        label="Email"
                        type="email"
                        variant="outlined"
                        className="custom-textfield"
                        value={userdetails.email}
                        onChange={(e)=>{handleUpdate('email',e.target.value)}}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='box'>
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                        <PhoneAndroidIcon sx={{ fontSize: 30, color: 'black', mr: 1 }} />
                        <TextField
                        fullWidth
                        id="phone-field"
                        label="Phone no."
                        type='tel'
                        variant="outlined"
                        className="custom-textfield"
                        value={userdetails.mobile}
                        onChange={(e)=>{handleUpdate('mobile',e.target.value)}}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="box">
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 500, width: '100%' }}>
                        <KeyIcon sx={{ fontSize: 30, color: 'black', mr: 1 }} />
                        <TextField
                        fullWidth
                        id="password-field"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        className="custom-textfield"
                        value={userdetails.password}
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
                        <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} variant="contained" className='submit-btn' type='submit'>sign up</Button>
                    </Box>
                </Box>

                <div className='signup-bar'>
                  <p>Already have an account? <b><a href="/login">Signin</a></b></p>
                </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default RegForm