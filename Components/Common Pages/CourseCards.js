import React, { useContext } from 'react'
import '../../ComponentsCss/Common Pages/CourseCards.css'
import { cartContext } from './CartProvider'
import { useNavigate } from 'react-router-dom';


const CourseCards = ({subjects}) => {
    const {addtoCart, itemExist}=useContext(cartContext);
    const navigate=useNavigate();

    const handleAddToCart=(element)=>{
        if (itemExist(element.id)) {
            navigate('/mycart')
        }else{
            addtoCart(element);
        }
    }



    const handleSinglePage=(id)=>{
        navigate(`/courses/${id}`)
    }
  return (
    <div className='outer-cards'>
        <div className='inner-cards'>
            {subjects && (
                subjects.map((ele,idx)=>{
                    return(
                    <div className='card-outer' key={idx} >
                        <div className='card-inner-img' ><img src={require('../../Assets/AllCoursesimg/c2.jpg')} alt="logo" /></div>
                        <div className='card-data-box' >
                            <div className='card-data-title' onClick={()=>{handleSinglePage(ele.id)}}>{ele.title}</div>
                            <div className='card-data-details1'>
                                <div className='cdd1'><img src={require('../../Assets/user2.png')} alt="logo" /> 0 Students</div>
                                <div className='cdd1'><img src={require('../../Assets/folder.png')} alt="logo" /> 14 Lessons</div>
                            </div>
                            <div className='card-data-details2'>
                                <div className='cdd2'>₹{ele.price}</div>
                                <div className='cdd3'><button onClick={()=>{handleAddToCart(ele)}}>{itemExist(ele.id) ? 'Go to cart':'Add to cart'} →</button></div>
                            </div>
                        </div>
                    </div>
                )})
            )}
        </div>
    </div>
  )
}

export default CourseCards