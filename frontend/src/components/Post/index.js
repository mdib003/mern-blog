import { useEffect, useState } from "react";
import "./post.css";
import { Loading } from "../Loading"

export const Post = () => {

    const [postsList, setPostsList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/v1/api/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(d => {
            setLoading(false);
            setPostsList(d.postsList)
        });
    }, [])

    return (
        <div className="container post-page">
            {loading ? <Loading />  :
                <>
                    {
                        postsList?.length > 0 && postsList.map((post, i) => {
                            return (
                                <div className="flex post-container" key={i}>
                                    {/*   <div className="img-post">
                                <img src='download.png' alt='react'></img>
                            </div> */}
                                    <div>
                                        <h3 className="mar-b-4">{post?.title}</h3>
                                        <p className="mar-b-4">{post.summary}</p>
                                        <div className="mar-b-4"><span>1 day ago</span></div>
                                        <button className="read-more-btn">Read more</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            }
            { /* <div className="flex post-container">
                <div className="img-post">
                    <img src='download.png' alt='react'></img>
                </div>
                <div>
                    <h3 className="mar-b-4">How React Works</h3>
                    <p className="mar-b-4">fsfsdfsdfsdfsfs</p>
                    <div className="mar-b-4"><span>1 day ago</span></div>
                    <button className="read-more-btn">Read more</button>
                </div>
            </div>
            <div className="flex post-container">
                <div className="img-post">
                    <img src='download.png' alt='react'></img>
                </div>
                <div>
                    <h3 className="mar-b-4">How React Works</h3>
                    <p className="mar-b-4">dfsfsdfsdfsdfsfererewr</p>
                    <div className="mar-b-4"><span>1 day ago</span></div>
                    <button className="read-more-btn">Read more</button>
                </div>
            </div> */}
        </div>
    )
}