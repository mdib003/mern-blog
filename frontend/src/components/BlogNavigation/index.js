import { useContext } from "react";
import { Link } from "react-router-dom";
import "./blog-navigation.css";
import { BlogContext } from "../../App";

export const BlogNavigation = () => {

    const { appValues, profileHandler } = useContext(BlogContext)

    const logoutHandler = async () => {
        await fetch('/v1/api/blog/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(response => response.json()).then(res => {})
        await profileHandler()
    }

    console.log('appValues', appValues)

    return (
        <div className="nav-container">
            <div className="container">
                <div className="flex justify-between align-center pad-t-16 pad-b-16">
                    <Link to='/' className="text-decoration-none color-white">MyBlog</Link>
                    <ul className="flex">
                        {(!appValues?.userName || !appValues?.fullName) &&
                            <>
                                <li className="list-style-none mar-l-16">
                                    <Link to='/login' className="text-decoration-none color-white">Login</Link>
                                </li>
                                <li className="list-style-none mar-l-16">
                                    <Link to='/register' className="text-decoration-none color-white">Register</Link>
                                </li>
                            </>
                        }
                        {
                            (appValues?.userName && appValues?.fullName) &&
                            <>
                                <li className="list-style-none mar-l-16">
                                    <Link to='/creat-post' className="text-decoration-none color-white">Create Post</Link>
                                </li>
                                <li className="list-style-none mar-l-16">
                                    <button className="text-decoration-none color-white" onClick={logoutHandler}>Logout</button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}