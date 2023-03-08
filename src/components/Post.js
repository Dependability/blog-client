import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {easyFetch} from '../components/helperFunctions';
import Layout from './Layout';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
const Post = () => {   
    const navigate = useNavigate();

    const {postId} = useParams();
    const [post, setPost] = useState({author : {}});
    const [comments, setComments] = useState([]);
    const [commenting, setCommenting] = useState(false);
    const [errors, setErrors] = useState('');
    const {title, body, author} = post;
    const currentUser = JSON.parse(localStorage.getItem('User'));
        useEffect(()=>{
        //possibly do multiple promises at the same time???

        easyFetch(`/posts/${postId}`).then(data => {
            console.log(data)
            setPost(data.post)
          
        }).catch(err => console.error(err));
        

    easyFetch(`/posts/${postId}/comments`).then(data => {
        setComments([...data.comments])
    })
    .catch(err => console.error(err));



    }, [commenting, postId])

    function deletePost(e) {
        e.preventDefault();
        let auth = localStorage.getItem('Authorization');
        if (!auth) {
            return;
        }
        easyFetch(`/posts/${postId}`, 'DELETE', {}, {Authorization: auth}).then((data)=> {
            console.log(data);
            if (data.success) {
                navigate('/');
            }
            
        }).catch(err => console.error(err));
    }

    function createComment(e) {
        e.preventDefault();
        let auth = localStorage.getItem('Authorization');
        if (!auth) {
            setErrors('You must login to send a comment!')
            return
        }
        easyFetch(`/posts/${postId}/comments`, 'POST', {
            body: e.target.body.value
        }, {Authorization: auth}).then(data => {
            if (!data.success) {
                setErrors(data.message)
            } else {
                setCommenting(false)
            }
        }).catch(err => console.error(err))
    }



    
    return (<Layout>
        <div className='post'>
        
        <h1>{title}</h1>
        <p className='author'>Author: {author.username}</p>
        <p className='body'>{body}</p>

        {currentUser ? (author._id === currentUser._id ? (<div><button onClick={()=> {navigate(`/posts/${postId}/update`)}}>Update</button><button onClick={deletePost}>Delete</button></div>) : '') : ''}
        <h2>Comments</h2>
        {comments.length ? (comments.map((val, i)=> <Comment key={i} comment={val} postId={postId} currentUser={currentUser}></Comment>)) : <p>No comments yet.</p>}
        {commenting ? <div className='createComment'>
            <form onSubmit={createComment}>
                <label htmlFor='comment'>Comment</label>
                <textarea id='comment' type='textbox' name='body' required></textarea>
                
                <button>Submit</button>
            </form>
            {errors ? <p>{errors}</p> : ''}
            <button className='cancelComment' onClick={()=> {
                setCommenting(false);
                setErrors('');
            }}>Cancel Comment</button>
        </div> : <div>
        <button className='addComment' onClick={()=> {setCommenting(true)}}>Add comment!</button>
        </div>}
        
        

        

        
        </div>
    </Layout>)
};

export default Post