import {Link } from "react-router-dom";


export const BlogNavigation = () => {
    return (
        <div className="nav-container">
            <div className="container">
                <div className="flex justify-between align-center pad-t-16 pad-b-16">
                    <Link to='/' className="text-decoration-none color-white">MyBlog</Link>
                    <ul className="flex">
                        <li className="list-style-none mar-l-16">
                            <Link to='/login' className="text-decoration-none color-white">Login</Link>
                        </li>
                        <li className="list-style-none mar-l-16">
                            <Link to='/login' className="text-decoration-none color-white">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}