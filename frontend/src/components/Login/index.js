import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import "./login.css";
import { BlogContext } from "../../App";

export const Login = () => {
    const [userNameError, setUserNameError] = useState(false)
    const [userNameErrorMsg, setUserNameErrorMsg] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
    const [navigate, setNavigate] = useState(false)

    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    })

    const { profileHandler } = useContext(BlogContext)

    const loginBlog = async (e) => {
        e.preventDefault()
        const { userName, password } = loginData

        if (!userName || !password) {
            if (!userName) {
                setUserNameError(true)
                setUserNameErrorMsg('Username is required')
            }
            if (!password) {
                setPasswordError(true)
                setPasswordErrorMsg('Password is required')
            }
            return
        }       

        await fetch('/v1/api/login', {
            method:'POST',
            body:  JSON.stringify(loginData), 
            headers: {
                "Content-type": "application/json"
            }
        }).then(d =>  d.json()).then(res => {          
            if (res.check && res.userExist && res.pw) {                
                setNavigate(true)
            } else if (!res.check && res.userExist && !res.pw) {
                setPasswordError(true)
                setPasswordErrorMsg(res.msg)
            } else if (!res.check && !res.userExist && !res.pw) {
                setUserNameError(true)
                setUserNameErrorMsg(res.msg)
            }
        }) 

        await profileHandler()
    }

    if (navigate) {
        return <Navigate to='/'/>
    }


    return (
        <div className="login">
            <div className="container login-page">
                <form onSubmit={loginBlog}>
                    <div className="login-form">
                        <h2 className="text-center form-title">Login</h2>
                        <div className="form-input-box">
                            <label>Username</label>
                            <input placeholder="Username" type="text" value={loginData.userName} onChange={(e) => {setUserNameError(false); setUserNameErrorMsg(''); setLoginData({...loginData, userName: e.target.value})}}/>
                            {userNameError && <p className="unmatch-pw">{userNameErrorMsg}</p>}
                        </div>
                        <div className="form-input-box">
                        <label>Password</label>
                            <input placeholder="Password" type="password" value={loginData.password} onChange={(e) => {setPasswordError(false); setPasswordErrorMsg(''); setLoginData({...loginData, password: e.target.value})}}/>
                            {passwordError && <p className="unmatch-pw">{passwordErrorMsg}</p>}
                        </div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}