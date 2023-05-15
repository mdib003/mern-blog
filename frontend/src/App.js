import { createContext, useEffect, useState } from "react";
import { BlogNavigation } from "./components/BlogNavigation";
import { Post } from "./components/Post";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

export const BlogContext = createContext()

function App() {

  const [appValues, setAppValues] = useState({
    userName: '',
    fullName: '',
    loggedIn: null,
    loading: true
  })

  useEffect(() => {
    fetch('/v1/api/profile', {
      method: 'POST',
      credentials: 'include',
    }).then((d) => d.json()).then((d) => {  
      console.log('d', d)
      if (d.userName && d.fullName) {
        setAppValues((prevState) => (
          { ...prevState, userName: d?.userName, fullName: d?.fullName, loading: false, loggedIn: true}
        ))
      } else {
        setAppValues((prevState) => (
          { ...prevState, loggedIn: false, loading: false }
        ))
      }
    }).catch((err) => {
      console.log('profile', err)
      setAppValues((prevState) => (
        { ...prevState, loggedIn: false, loading: false }
      ))
    });
  }, [appValues.loggedIn])

  if (appValues.loggedIn = false) {
    return <Navigate to='/login' />
  }

  return (
    <BlogContext.Provider value={{appValues, setAppValues}}>
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
