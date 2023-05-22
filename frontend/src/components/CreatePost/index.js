import { useState } from "react";
import { useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./create-post.css"

export const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    /*  const [file, setFile] = useState() */
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        setLoading(true)

        if (!title || !summary || !content) {
            setEmpty(true)
            setLoading(false)
            return
        }

        setTitle('')
        setSummary('')
        setContent('')
        setEmpty(false)

        fetch('/v1/api/create-post', {
            method: 'POST',
            body: JSON.stringify({ title, summary, content }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json()).then(d => {
            if (d.check) {
                setLoading(false)
                navigate('/')
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    return (
        <div className='container create-post-page'>
            {loading ? <div>Loading</div> :
                <>
                    {empty && <p className="err">All fields are required</p>}
                    <form onSubmit={submitForm}>
                        <div className="form-box">
                            <input placeholder='Title' type='text' value={title} onChange={e => { setEmpty(false); setTitle(e.target.value) }} className="form-input" />
                        </div>
                        <div className="form-box">
                            <input placeholder='Summary' type='text' value={summary} onChange={e => { setEmpty(false); setSummary(e.target.value) }} className="form-input" />
                        </div >
                        {/*  <div className="form-box">
                    <input type='file' onChange={e => { setEmpty(false); setFile(e.target.files) }} />
                </div> */}
                        <div className="form-box">
                            <ReactQuill onChange={ev => { setEmpty(false); setContent(ev) }} value={content} />
                        </div>
                        <div className="form-box">
                            <button type='submit' className="btn">Create</button>
                        </div>
                    </form>
                </>
            }
        </div>
    )
}