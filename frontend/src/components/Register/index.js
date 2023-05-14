import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import "../Login/login.css";

export const Register = () => {
    const [navigate, setNavigate] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [registrationFailedState, setRegistrationFailedState] = useState(false)
    const [registerData, setRegisterData] = useState({
        fullName: "",
        userName:"",
        password:"",
        confirmPassword:""
    })

    const fullNameRef = useRef()
    const userNameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const changeBlog = (e) => {
        setPasswordError(false)
        setRegistrationFailedState(false)
        const {name, value} = e.target
        if (name === 'fullName') {
            fullNameRef.current.classList.remove('input-error')
        }
        if (name === 'userName') {
            userNameRef.current.classList.remove('input-error')
        }
        if (name === 'password') {
            passwordRef.current.classList.remove('input-error')
        }
        if (name === 'confirmPassword') {
            confirmPasswordRef.current.classList.remove('input-error')
        }
        setRegisterData({...registerData, [name]: value})
    }

    const registerBlog = (e) => {
        e.preventDefault()

        const {fullName, userName, password, confirmPassword} = registerData
        if (!fullName || !userName || !password || !confirmPassword) {
            if (!fullName) {
                fullNameRef.current.classList.add('input-error')
            }
            if (!userName) {
                userNameRef.current.classList.add('input-error')
            }
            if (!password) {
                passwordRef.current.classList.add('input-error')
            }
            if (!confirmPassword) {
                confirmPasswordRef.current.classList.add('input-error')
            }
            return
        }

        if (password !== confirmPassword) {
            setPasswordError(true)
            return
        }
        fetch("/v1/api/register", {
            method:"POST", 
            body: JSON.stringify(registerData), 
            headers: {
                "Content-type": "application/json"
            }
        }).then(d => d.json()).then(res => {
            if (res.check) {               
                setNavigate(true)
            } else if (!res.check) {               
                setRegistrationFailedState(true)
            }
        })
    }

    if (navigate) {        
      return <Navigate to="/login"/>
    }

    return (
        <div className="login">
            <div className="container login-page">
                <form onSubmit={registerBlog}>
                    <div className="login-form">
                        <h2 className="text-center form-title">Register</h2>
                        <div className="form-input-box">
                            <label>Full Name</label>
                            <input placeholder="Full Name" type="text" name="fullName" onChange={changeBlog} value={registerData.fullName} ref={fullNameRef} />
                        </div>
                        <div className="form-input-box">
                            <label>Username</label>
                            <input placeholder="Username" type="text" name="userName" onChange={changeBlog} value={registerData.userName} ref={userNameRef} />
                            {registrationFailedState && <p className="unmatch-pw">Username already exists</p>}
                        </div>
                        <div className="form-input-box">
                            <label>Password</label>
                            <input placeholder="Password" type="password" name="password" onChange={changeBlog} value={registerData.password} ref={passwordRef} />
                        </div>
                        <div className="form-input-box">
                            <label>Confirm Password</label>
                            <input placeholder="Confirm Password" type="password" name="confirmPassword" onChange={changeBlog} value={registerData.confirmPassword} ref={confirmPasswordRef} />
                            {passwordError && <p className="unmatch-pw">Passwords are not matching</p>}
                        </div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}