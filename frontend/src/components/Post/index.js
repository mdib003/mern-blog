import "./post.css";

export const Post = () => {
    return (
        <div className="container post-page">
            <div className="flex post-container">
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
            </div>
        </div>
    )
}