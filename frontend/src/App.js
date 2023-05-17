import { createContext, useEffect, useState } from "react";
import { BlogNavigation } from "./components/BlogNavigation";
import { Post } from "./components/Post";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

export const BlogContext = createContext()

function App() {

  const [appValues, setAppValues] = useState({
    userName: '',
    fullName: '',
    loggedIn: null,
    loading: true
  })

  const navigate = useNavigate()

  useEffect(() => {
    profileHandler()
  }, [])

  const profileHandler = async () => {
    await fetch('/v1/api/profile', {
      method: 'POST',
      credentials: 'include',
    }).then((d) => d.json()).then((d) => {
      if (d.userName && d.fullName) {
        setAppValues((prevState) => (
          { ...prevState, userName: d?.userName, fullName: d?.fullName, loading: false }
        ))
      } else {
        setAppValues((prevState) => (
          { ...prevState, loading: false, userName: '', fullName: ''}
        ))
        navigate('/login')
      }
    }).catch((err) => {
       setAppValues((prevState) => (
         { ...prevState, loading: false}
       ))
       navigate('/login')        
    });
  }


  return (
    <BlogContext.Provider value={{ appValues, profileHandler }}>
      {!appValues.loading ? <div>
        <BlogNavigation></BlogNavigation>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div> : <div className="text-center">
        Loading
      </div>}
    </BlogContext.Provider>
  );
}

export default App;
