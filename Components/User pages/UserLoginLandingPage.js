import React, { useState } from 'react'
import '../../ComponentsCss/User Pages/UserLoginLandingPage.css'
import AllCourses from '../Common Pages/AllCourses';
import UserDashboard from './UserDashboard';
import UserMessages from './UserMessages';
import UserAnalytics from './UserAnalytics';
import UserPayments from './UserPayments';
import UserSettings from './UserSettings';
import MUIDatePicker from './MUIDatePicker';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';



const UserLoginLandingPage = () => {


  const [viewDash, setDash]=useState(true);
  const [selected, setSelected]=useState(1);
  const navigate=useNavigate();

  const {Logout}=useAuth();

  const [page,setPage]=useState(1);

  const handleDashView=(val)=>{
    setDash((prev)=>!prev);
    handleSelectView(val)
    setPage(val);
    console.log("page value is ",page)
    console.log(viewDash)
  }

  const handleLogout=()=>{
    
    if (window.confirm("do u want to Log out?")) {
      Logout()
      setTimeout(()=>{
        navigate('/')
      },0)
      
    }
  
  }

  const handleSelectView=(divName)=>{
    setSelected(divName);
    setPage(divName)
    console.log(divName)
  }

  const pageRendering=()=>{

    switch(page){
      case 1: return <div className='user-land-pagerend'>
                        <div className='user-land-banner' style={{backgroundImage:`url(${require('../../Assets/allc2.jpg')})`}}>
                        <img src={require('../../Assets/banner1.png')} alt="logo" className='banner1'/>
                        <div className='user-banner-welcome'>  Welcome, Siva</div>
                        <img src={require('../../Assets/banner2.png')} alt="logo" className='banner1' />          
                        </div>
                        <UserDashboard />
                     </div>
                      

      case 2: return <div className='user-land-pagerend'><AllCourses /></div>
      case 3: return <div className='user-land-pagerend'><UserMessages /></div>
      case 4: return <div className='user-land-pagerend'><UserAnalytics /></div>
      case 5: return <div className='user-land-pagerend'><UserPayments /></div>
      case 6: return <div className='user-land-pagerend'><UserSettings /></div>
      default: return handleSelectView(1);
    }

  }


    
  return (
    <div className='outer-userland' style={{backgroundImage:`url(${require('../../Assets/userland2.jpg')})`}}>
      <div className='inner-userland'>
        <div className={`user-dash ${viewDash ? 'active':''}`}>
          <div className='userinnerdash'>
            <div className='userdashprofile'>
              <img src={require('../../Assets/pro2.jpg')} alt="logo" className='userdashimg' onClick={()=>{handleDashView(selected)}}/>
              <div className='userdashname'> Sivakumar</div>
            </div>

            <div className='usdsec1'>
              <div className={`userdashprofileS ${selected===1 ? 'selected':''}`} onClick={()=>{handleSelectView(1)}}>
                <img src={require('../../Assets/app.png')} alt="logo" className={`userdashimgS ${selected===1 ? 'selected':''}`} onClick={()=>{handleDashView(1)}}/>
                <div className='userdashnameS'>Dashboard</div>
              </div>

              <div className={`userdashprofileS ${selected===2 ? 'selected':''}`} onClick={()=>{handleSelectView(2)}}>
                <img src={require('../../Assets/bookicon.png')} alt="logo" className={`userdashimgS ${selected===2 ? 'selected':''}`} onClick={()=>{handleDashView(2)}}/>
                <div className='userdashnameS'> Courses</div>
              </div>

              <div className={`userdashprofileS ${selected===3 ? 'selected':''}`} onClick={()=>{handleSelectView(3)}}>
                <img src={require('../../Assets/mail-inbox-app.png')} alt="logo" className={`userdashimgS ${selected===3 ? 'selected':''}`} onClick={()=>{handleDashView(3)}}/>
                <div className='userdashnameS'> Messages</div>
              </div>

              <div className={`userdashprofileS ${selected===4 ? 'selected':''}`} onClick={()=>{handleSelectView(4)}}>
                <img src={require('../../Assets/increase.png')} alt="logo" className={`userdashimgS ${selected===4 ? 'selected':''}`} onClick={()=>{handleDashView(4)}}/>
                <div className='userdashnameS'> Analytics</div>
              </div>

              <div className={`userdashprofileS ${selected===5 ? 'selected':''}`} onClick={()=>{handleSelectView(5)}}>
                <img src={require('../../Assets/secure-payment.png')} alt="logo" className={`userdashimgS ${selected===5 ? 'selected':''}`} onClick={()=>{handleDashView(5)}}/>
                <div className='userdashnameS'> Payments</div>
              </div>

            </div>


            <div className='usdsec2'>
              <div className={`userdashprofileS ${selected===6 ? 'selected':''}`} onClick={()=>{handleSelectView(6)}}>
                <img src={require('../../Assets/setting.png')} alt="logo" className={`userdashimgS ${selected===6 ? 'selected':''}`} onClick={()=>{handleDashView(6)}}/>
                <div className='userdashnameS'> Settings</div>
              </div>

              <div className={`userdashprofileS ${selected===7 ? 'selected':''}`} onClick={()=>{handleSelectView(7)}}>
                <img src={require('../../Assets/logout.png')} alt="logo" className={`userdashimgS ${selected===7 ? 'selected':''}`} onClick={()=>{handleDashView(7)}}/>
                <div className='userdashnameS' onClick={()=>{handleLogout()}}> Logout</div>
              </div>
            </div>

          </div>
        </div>
        <div className='user-land-cont'>
        {pageRendering()}
        </div>
        <div className='user-other'>
          <div className='user-other-inner'>
            <div className='other-calender'>
              <MUIDatePicker />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLoginLandingPage