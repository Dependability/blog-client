import {useState} from 'react';
import { easyFetch } from './helperFunctions';
export default function Comment({comment, currentUser, postId}) {
    const [updating, setUpdate] = useState(false);
    const [commentInfo, setComment] = useState(comment.body);
    function deleteComment(e) {
        e.preventDefault();
        let auth = localStorage.getItem('Authorization');
        if (!auth) {
            
            return
        }
        easyFetch(`/posts/${postId}/comments/${comment._id}`, 'DELETE', {}, {Authorization: auth}).then(data => {
            if (data.success) {
                setUpdate(false);
                setComment('');
            }
        }).catch(err => console.error(err))
    }
    function updateComment(e) {
        e.preventDefault();
        const value = document.querySelector('.updateComment input').value;
        console.log(value)
        let auth = localStorage.getItem('Authorization');
        if (!auth) {
            
            return
        }
        easyFetch(`/posts/${postId}/comments/${comment._id}`, 'PUT', {
            body: value
        }, {Authorization: auth}).then(data => {
            if (!data.success) {
            } else {
                setUpdate(false);
                setComment(value);
            }
        }).catch(err => console.error(err))
    }
    if (commentInfo) {
        return <div className='comment'>
        <h3>{comment.author.username}</h3>
        {updating ? 
        <div className='updateComment'>
            <input type='text' name='body' defaultValue={commentInfo}></input>
            <button onClick={updateComment}>Submit</button>
        </div>: <p className='commentBody'>{commentInfo}</p>}
        <p>{new Date(comment.time).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
        {currentUser ? (comment.author._id === currentUser._id ? (<div><button onClick={()=> {
            setUpdate((c) => {
                return !c
            })
        }}>{updating ? "Cancel Update" : "Update"}</button><button onClick={deleteComment}>Delete</button></div>) : '') : ''}
    </div>
    } else {
        return <></>
    }
    
}