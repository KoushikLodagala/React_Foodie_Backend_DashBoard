import React, {useState}from 'react'
import { API_URL } from '../../data/apiPath';

const register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
        const response = await fetch(`${API_URL}/vendor/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username, email,password})
        })


        const data = await response.json()
        if(response.ok){
            console.log(data)
            setUsername("")
            setEmail("");
            setPassword("");
            alert("Vendor Registration Successful")
            showLoginHandler()
        }
      } catch (error) {
        console.error("Registration falied",error)
        alert("Registration falied")
        
      }
  } 

  return (
    <div className="registerSection">

<form className='authForm' onSubmit={handleSubmit} >
    <h3>Vendor Register</h3>   
     <label>UserName</label>  
     <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} name="username" placeholder="Enter your UserName"/>
            <br />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Enter your email"/>
       <br />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Enter your password"/>
        <br />
        <div className="btnSubmit">
            <button type="submit">Submit</button>
        </div>
    </form>

    </div>
  )
}

export default register