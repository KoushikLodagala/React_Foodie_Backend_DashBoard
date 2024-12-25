import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/welcome';
import AllProducts from '../components/AllProducts';


const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showFirm, setShowFirm  ] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)
    // const [showFirmTitle, setShowFirmTitle] = useState(false)

    useEffect(()=>{
        const loginToken = localStorage.getItem('loginToken');
          if(loginToken){
            setShowLogOut(true)
          }
    },[])

    // useEffect(()=>{
    //   const firmname = localStorage.getItem('firmnam')
    //   if(firmname){
    //     setShowFirmTitle(false)
    //   }
    // },[])

    const logOutHandler = ()=>{
      confirm(" are you sure you want to log out?")
      localStorage.removeItem("loginToken")
      localStorage.removeItem("firmId")
      setShowLogOut(false)
    }

    const showLoginHandler = () => {
      setShowLogin(true)
      setShowRegister(false)
      setShowFirm(false)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)


    }

    const showRegisterHandler = () => {
      setShowRegister(true)
       setShowLogin(false)
       setShowFirm(false)
       setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)


    }

    const showFirmHandler = () => {
      if(showLogOut){
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(true)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
      
      }else{
        alert(" Please login ")
        setShowLogin(true)
      }
    }

    const showProductHandler = ()=>{
        if(showLogOut){
      setShowProduct(true)
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowWelcome(false)
      setShowAllProducts(false)
        }else{
          alert(" Please login ")
          setShowLogin(true)
        }
    }

    const showWelcomeHandler = ()=>{
      setShowProduct(false)
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowAllProducts(false)
      setShowWelcome(true)
    }

    const showAllProductsHandler = ()=>{
if(showLogOut){
      setShowProduct(false)
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowWelcome(false)
      setShowAllProducts(true)
    }else{
      alert(" Please login ")
      setShowLogin(true)
    }
    }


  return (
   <>
   <section className='landingsection'>
    <NavBar showLoginHandler ={showLoginHandler} showRegisterHandler ={showRegisterHandler} 
        showLogOut = {showLogOut}
        logOutHandler= {logOutHandler}
      />
    <div className="collectioSection">
    <SideBar showFirmHandler ={showFirmHandler} showProductHandler ={showProductHandler}
    showAllProductsHandler = {showAllProductsHandler}
    />
    {showLogin &&  <Login showWelcomeHandler ={showWelcomeHandler} /> }
    {showRegister && <Register showLoginHandler= {showLoginHandler} /> }
    { showFirm && showLogOut && <AddFirm /> }
    { showProduct && showLogOut && <AddProduct/> }
    { showWelcome && <Welcome/> }
    {showAllProducts && showLogOut && <AllProducts/> }

    
    
   
    </div>
    
   </section>
   </>
  )
}

export default LandingPage