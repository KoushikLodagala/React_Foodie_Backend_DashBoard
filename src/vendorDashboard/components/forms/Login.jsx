import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';


const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');




  const loginHandler = async (e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
        const data = await response.json()
        if(response.ok){
          alert("Login Successful")
          setEmail("")
          setPassword("")
          localStorage.setItem('loginToken', data.token)
         showWelcomeHandler()
        }

        const vendorId = data.vendorId

        console.log("checkindddg vendorid ", vendorId)
        const vendorResponse  = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
        const vendorData = await vendorResponse.json()
        if(vendorResponse.ok){
          const vendorFirmId = vendorData.vendorFirmId
          console.log("checking for firmID",vendorFirmId)
          // const  vendorFirmName = vendorData.vendor.firm[0].firmname;
          // console.log("my firmname is", vendorFirmName)
          localStorage.setItem('firmId', vendorFirmId)
          // localStorage.setItem('firmname', vendorFirmName )
          window.location.reload()                     
        }
      
    } catch (error) {
      alert("Login Fail")
      // console.log(error)
    }
  }




  return (
  <div className="loginSection">

    <form onSubmit={loginHandler} className='authForm' >
        <h3>Vendor Login</h3>     
        <label>Email:</label> 
        <input type="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
        <br />

        <label>Password:</label>
        <input type="password" value={password} name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
        <br />
        <div className="btnSubmit">
        <button type="submit">Login</button>
        </div>
    </form>
    
  </div>

  )
}

export default Login