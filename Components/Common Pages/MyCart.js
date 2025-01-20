import React, { useContext, useEffect, useState } from 'react'
import '../../ComponentsCss/Common Pages/Mycart.css'
import { cartContext } from './CartProvider';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useAuth } from '../Authentication/AuthContext';
import ModalLoginform from '../Authentication/ModalLoginform';



const MyCart = () => {


    const {cart , removeCartItem}=useContext(cartContext);


    const navigate=useNavigate();

    const [courses, setCourses]=useState(cart);
    const [cartTotal, setCartTotal]=useState(0);

    const [isModalOpen, setModalOpen]=useState(false);

    const {isAuthenticated}=useAuth();

    const closeModal=()=>{
      setModalOpen(false);
    }

    const openModal=()=>{
      setModalOpen(true);
    }

    const handleCheckout=()=>{

      if (!isAuthenticated) {
        openModal()
        
      }else{
        navigate('/checkout');
      }

    }

    useEffect(()=>{

      setCourses(cart)
      setCartTotal(findTotalCost(cart))
      

    },[cart])

    const findTotalCost=(courses)=>{
      
      const sum=courses.reduce((acc,ele)=>{
        return acc+parseInt(ele.price,10);
      },0)

      return sum;
    }

    if (courses) {
      console.log(courses)
      const sum=courses.reduce((acc,ele)=>{
        return acc+ parseInt(ele.price,10);
      },0)

      console.log(sum)
    }


  return (
    <div className='outer-mycart'>
        <div className='inner-mycart'>

            
              <div className='mycart-desc'>
                  <div className='descTitle'>Shopping Cart</div>
                  <div className='descnum'>{courses.length} {courses.length===1 ? 'course':'courses'} in your Cart</div>
              </div>
            <div className='cartlayer1'>
              <Modal isOpen={isModalOpen} onClose={()=>{closeModal()}}><ModalLoginform/></Modal>
              {cart.length>0 ? (
              <div className='allcart-view'>
                <div className='cardStack'>
                {cart.length>0 && (
                  cart.map((element,idx)=>{
                    return(
                      <div className='cartCard' key={idx}>
                        <img src={require('../../Assets/cardgirl1.jpg')} alt="poster"/>
                        <div className='cartCarddet'>
                          <div className='cartCarddet1'>
                            <div className='cartcardt1'>{element.title}</div>
                            <div className='cartcardt2'>{element.short}</div>
                          </div>

                          <div className='cartCarddet2'>
                            <div className='cartcardp'>₹ {element.price}</div>
                            <div className='cartcardr' onClick={()=>{removeCartItem(element.id)}}>Remove</div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                </div>
                <div className='cartSummary'>
                  <div className='sumtitle'>Total:</div>
                  <div className='sumtotal'>₹ {cartTotal}</div>
                  <div><button className='sumcheck' onClick={()=>{handleCheckout()}}>Checkout</button></div>
                  <div><hr/></div>
                  <div><p>Promotions</p></div>
                  <div className='sumcoupon'><input type='text' placeholder='Enter Coupon' className='sumin'/> <button className='sumbt'>Apply</button></div>
                </div>
              </div>):(<div className='keepshop'>
                    <img src={require('../../Assets/filesearch.jpg')} alt="poster"/>
                    <p>Your cart is empty. Keep shopping to find a course!</p>
                    <div><button className='kshop' onClick={()=>{navigate('/courses')}}>Keep Shopping</button></div>
                </div>)}
              

              

            </div>
            

            {/* <div className='cartSummary'>
              <div className='sumtitle'>Total:</div>
              <div className='sumtotal'>₹ </div>
              <div><button className='sumcheck'>Checkout</button></div>
              <div><hr/></div>
              <div><p>Promotions</p></div>
              <div className='sumcoupon'><input type='text' placeholder='Enter Coupon' className='sumin'/> <button className='sumbt'>Apply</button></div>
            </div> */}
        </div>
    </div>
  )
}

export default MyCart