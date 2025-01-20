import React, { createContext, useEffect, useState } from 'react'


export const cartContext = createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState(() => {
        const cartItems = sessionStorage.getItem('cartCourses');
        return cartItems ? JSON.parse(cartItems) : [];
      });




    // useEffect(()=>{

    //     const cartItems=sessionStorage.getItem('cartCourses')
    //     if (cartItems) {
    //         setCart(JSON.parse(cartItems));
    //     }

    // },[])



    useEffect(()=>{

        sessionStorage.setItem('cartCourses',JSON.stringify(cart));

    },[cart])



    const addtoCart=(course)=>{

        setCart((prevCourse)=>{
            const existingCourse= prevCourse.find((item)=> item.id===course.id);
            if (existingCourse) {
                return prevCourse.map((citems)=> citems.id===course.id ? {...citems,quantity:citems.quantity+1} : citems)
            }
            return [...prevCourse,{...course,quantity:1}]
        })
    }

    const removeCartItem=(id)=>{
        setCart((prev)=> prev.filter((ele)=>ele.id!==id));
    }

    const itemExist=(id)=>{
        return cart.some((ele)=> ele.id===id);
    }


    const cartLength=()=>{
        return cart.length;
    }


  return (
    <cartContext.Provider value={{cart, addtoCart, removeCartItem, itemExist, cartLength}}>{children}</cartContext.Provider>
  )
}

export default CartProvider