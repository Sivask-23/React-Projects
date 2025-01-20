import React, { useEffect, useState } from 'react'
import '../../ComponentsCss/Common Pages/SingleSubject.css'
import { useParams } from 'react-router-dom'
import { getallSubjects } from '../../APIServices/All Subjects/getAllSubjects'

const SingleSubject = () => {


  const [sub, setSub]=useState()
  const {id}=useParams();


    useEffect(()=>{

        const fetchAllSub=async(id)=>{
            try {

                const subResponse=await getallSubjects();
                if (subResponse && subResponse.data) {
                    setSub(subResponse.data.find((ele)=>{return ele.id===id}));
                    
                }
                
            } catch (error) {
                console.log(error, "from all course UI")
            }
        }

        fetchAllSub(id);

    },[id])
    if (sub) {
      console.log(sub)
    }
  return (
    <div className='outer-sing'>
        
        <div className='inner-sing'>
            <div className='inner-banner'>
              <div className='innerbanrate'>
                <div className='innerrate1'></div>
                <div className='innerrate2'></div>
                <div className='innerrate1'></div>
                <div className='innerrate1'></div>
              </div>
            </div>

            <div className='inner-ban-cont'>
                <div className='inner-ban-data'>
                  <div className='innerbantitle'>{sub?.title}</div>
                  <div className='innerbandesc'>{sub?.short}</div>
                </div>
                <div className='inner-ban-card'></div>
            </div>
        </div>

    </div>
  )
}

export default SingleSubject