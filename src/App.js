import Posts from './components/Posts';
import Post from './components/Post'
import CreatePost from './CreatePost';
import Login from './components/Login';
import Register from './components/Register';
import './styles/styles.css'
import {useEffect, useState} from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Layout from './components/Layout';
function App() {
  const [posts, setPost] = useState([])

  useEffect(()=> {
    fetch('lit-reef-26994.herokuapp.com/api/posts')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setPost(data.posts)
      
    })
    .catch(err => console.error(err));

  }, [])

  return <BrowserRouter basename='blog-client'>
    {/* <button onClick={()=> {
      localStorage.clear()
    }}>Sign out</button> */}
    <Routes>
      <Route exact path='/' element={<Posts posts={posts}/>}/>
      <Route exact path='/layout' element={<Layout></Layout>} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/posts/create' element={<CreatePost />} />
      <Route exact path='/posts/:postId' element={<Post />} />
      <Route exact path='/posts/:postId/update' element={<CreatePost update={true} />} />
    </Routes>
  </BrowserRouter>
}

export default App;
