import React, { useState, useEffect } from 'react'
import '../../ComponentsCss/Common Pages/IndexPage.css'
import Button from '@mui/material/Button';
import IndexPageExpComp from './IndexPageComp1';
import CourseCards from './CourseCards';
import { getallSubjects } from '../../APIServices/All Subjects/getAllSubjects';
const IndexPage = () => {

      const [allsub, setAllSub]=useState([]);
      useEffect(()=>{

        const fetchAllSub=async()=>{
            try {

                const subResponse=await getallSubjects();
                if (subResponse) {
                    setAllSub(subResponse.data.splice(0,3));
                    
                }
                
            } catch (error) {
                console.log(error, "from all course UI")
            }
        }

        fetchAllSub();

    },[])

  return (
    <div className='outer-index'>
        <div className='inner-index'>

        <div className='index-poster' style={{ backgroundImage: `url(${require('../../Assets/logepageinner.png')})` }}>
          <div className='index-poster-data'>
            <div className='banner-data'><p>Learn</p><p>Develop.</p><p>Discover..</p></div>
            <div className='banner-data-intro'>an innovative e-learning platform designed to make education accessible, interactive, and engaging. Explore courses, quizzes, and learning resources tailored to your needs. Empower yourself with the flexibility to learn at your own pace, anytime, anywhere. Let’s embark on your journey to knowledge and success!</div>
            <div className='banner-data-btn'> <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight:'bold', letterSpacing: '0.5px' }} variant="contained" className='banner-btn'>Enroll now</Button></div>
          </div>

          <img src={require('../../Assets/bannergirl.png')} alt="logo" />
        </div>
        {/* <a href="/LogIn">login</a> */}
        <IndexPageExpComp />
        </div>

        <div className='feat-courses' style={{ backgroundImage: `url(${require('../../Assets/coursebg.jpg')})` }}>
          <div className='feat-title'>Featured Courses</div>
          <div className='feat-card-space'><CourseCards subjects={allsub}/></div>

        </div>
    </div>
  )
}

export default IndexPage