import {BlogNavigation} from "./components/BlogNavigation";
import { Post } from "./components/Post";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Route, Routes} from "react-router-dom";
import "./App.css"

function App() {
  return (
    <div>
     <BlogNavigation></BlogNavigation>
     <Routes>
      <Route path='/' element={<Post/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
     </Routes>
    </div>
  );
}

export default App;
