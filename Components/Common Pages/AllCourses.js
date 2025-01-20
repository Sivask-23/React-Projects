import React, { useEffect, useState } from 'react'
import '../../ComponentsCss/Common Pages/AllCourses.css'
import { getallSubjects } from '../../APIServices/All Subjects/getAllSubjects';
import CourseCards from './CourseCards';




const AllCourses = () => {



    const [allsub, setAllSub]=useState([]);
    // const imgFiles=[
    //     '../../Assets/allcoursebg1.jpg',
    //     '../../Assets/AllCoursesimg/c2.jpg',
    //     '../../Assets/AllCoursesimg/c3.jpg',
    //     '../../Assets/AllCoursesimg/c4.jpg',
    //     '../../Assets/AllCoursesimg/c5.jpg',
    // ]

    useEffect(()=>{

        const fetchAllSub=async()=>{
            try {

                const subResponse=await getallSubjects();
                if (subResponse) {
                    setAllSub(subResponse.data);
                    
                }
                
            } catch (error) {
                console.log(error, "from all course UI")
            }
        }

        fetchAllSub();

    },[])

    if (allsub) {
        console.log(allsub)
    }


  return (
    <div className='outer-allcourses' style={{ backgroundImage: `url(${require('../../Assets/allc3.jpg')})` }}>
        <div className='inner-allcourses'>  
            <div className='allcourse-title'>Courses to get you started</div>
            <div className='allcourses-cont'>
                {allsub && (<CourseCards subjects={allsub}/>)}
            </div>

        </div>
    </div>
  )
}

export default AllCourses