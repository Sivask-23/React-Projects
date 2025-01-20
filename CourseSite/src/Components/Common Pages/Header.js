import React, { useContext} from 'react'
import '../../ComponentsCss/Common Pages/Header.css'
import { useNavigate } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { cartContext } from './CartProvider';
import { useAuth } from '../Authentication/AuthContext';


const Header = () => {



  const navigate=useNavigate();
   const {isAuthenticated}=useAuth();

  const {cartLength}=useContext(cartContext)


  const handleLogin=()=>{
    navigate('/login');
  }

  const handleSignup=()=>{
    navigate('/Register');
  }

  const handleCourses=()=>{
    navigate('/courses');
  }

  const handleMyCart=()=>{
    navigate('/mycart');
  }

  console.log(isAuthenticated)

  return (
    <div className='outer-head'>
        <div className='inner-head'>
          <div  className='innerhead-logo'>

          </div>
          <div className='innerhead-navigation'>

            <div className='n1' onClick={()=>{handleCourses()}}>Courses</div>
            <div className='n1'>About us</div>
            <div className='n1'>Resourses</div>

          </div>
          {/* <div className='innerhead-Actions'>
            <ShoppingCartOutlinedIcon className='shopping-cart-icon'/>
          </div> */}
          <div className='innerhead-logbtns'>
            <div className='innerhead-Actions'>
              <ShoppingCartOutlinedIcon className='shopping-cart-icon' onClick={()=>{handleMyCart()}}/>
              <div className={`cartNumber ${cartLength() === 0 ? 'zero' : ''}`}>{cartLength()===0?'':cartLength()}</div>
            </div>
            {!isAuthenticated && (
              <>
                <button className='lg' onClick={handleLogin}>Log In</button>
                <button className='sp' onClick={handleSignup}>Sign Up</button>
              </>
            )}
            
          </div>
          {isAuthenticated && (<div className='propic-icon'><img src={require('../../Assets/pro1.png')} alt="propic" onClick={()=>{navigate('/user/land')}}/></div>)}
        </div>
    </div>
  )
}

export default Header