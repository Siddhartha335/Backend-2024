import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()

    const usernameRef = useRef("")
    const passwordRef = useRef("")

    const giveToken = async (e) => {
        e.preventDefault()

        const bodyValue = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyValue)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const token = await response.json()
            console.log(token)
            localStorage.setItem('token',token.token)
            navigate('/home')
        } catch (err) {
            console.error(err)
        }
    }


  return (
   <form  onSubmit={giveToken} style={{display:'grid',placeItems:'center',gap:"25px", marginTop:"100px"}}>
        <div>
            <label>Username:</label>
            <input type='text' placeholder='Your Name' ref={usernameRef} />
        </div>
        <div>
            <label>Password:</label>
            <input type='password' placeholder='Your Password' ref={passwordRef} />
        </div>
        <button>Login</button>
   </form>
  )
}
