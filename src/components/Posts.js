import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { easyFetch } from './helperFunctions';

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';


const Posts = ({posts}) => {
    const navigate = useNavigate();
    function createPost() {
        if (localStorage.getItem('Authorization')) {
            navigate('/posts/create')
        } else {
            navigate('/login');
        }
    }
    return (<Layout>
        <div className='posts'>
            <h1>All Posts</h1>
            <div className='postList'>
            {
            posts.map((post, i) => {
                return <h1 key={i}><a href={'/posts/' + post._id}>Title: {post.title}</a></h1>
            })
    }
            </div>
            <button onClick={createPost}><Icon path={mdiPlus} size={1.3} /> Create Post </button>

        </div>
       
    
        
    
    </Layout>)
};

export default Posts