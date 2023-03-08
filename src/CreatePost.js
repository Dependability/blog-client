import { easyFetch } from "./components/helperFunctions"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

import Layout from "./components/Layout";
function CreatePost({update}) {
    
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const {postId} = useParams();
    const [postInfo, setPost] = useState({});
    useEffect(()=> {
        if (update) {
            console.log('infinite...')
            
            easyFetch('/posts/' + postId).then(data => {
                console.log(data)
                setPost(data.post)
              
            }).catch(err => console.error(err));
        }
    },[postId, update])
    
    function updatePost(e) {
        e.preventDefault();
        let auth = localStorage.getItem('Authorization')
        
        if (!auth) {
            setError('Please login or reguister to create a post!')
            return
        }

        easyFetch('/posts/'+ postId, 'PUT', {
            title: e.target.title.value,
            body: e.target.body.value
        }, {Authorization: auth}).then((data)=> {
            if (data.success) {
                navigate(`/posts/${data.post._id}`)
            } else {
                setError(data.message);
            }
        })
    }
    function createPost(e) {
        e.preventDefault();
        let auth = localStorage.getItem('Authorization')
        
        if (!auth) {
            setError('Please login or register to create a post!')
            return
        }
         easyFetch('/posts', 'POST', {
            title: e.target.title.value,
            body: e.target.body.value
        }, {Authorization: auth}).then((data)=> {
            if (data.success) {
                navigate(`/posts/${data.post._id}`)
            } else {
                setError(data.message);
            }
        })
    }
    return <Layout>
        <div className='createPost'>
        <h1>Create Post</h1>
        <form onSubmit={update ? updatePost :createPost }> 

            <label htmlFor='input-title'>Title</label>
            <input id='input-title' type='text' required name='title' defaultValue={update ? postInfo.title : ''}></input>
            
            <label htmlFor='content'> Content</label>
            <textarea id='content' required name='body' defaultValue={update ? postInfo.body : ''}></textarea>
            
            <button>{update ? "Update Post": "Create Post"}</button>
        </form>
        
        {error ? (<>
            <p>{error}</p>
        </>) : ''}
        </div>
    </Layout>
}

export default CreatePost