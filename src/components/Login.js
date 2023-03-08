import {useState, useEffect} from 'react';
import {easyFetch} from '../components/helperFunctions';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
function Login() {

    const [error, setError] = useState('')
    const navigate = useNavigate();
    useEffect(()=> {
        if (localStorage.getItem('User')) {
            navigate('/');
            return;
        }
    }, [navigate]);
    function login(e) {
        e.preventDefault()
        console.log('Trying to login')

        easyFetch('/login', 'POST', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then((data)=>{
            console.log(data)
            if (data.success) {
                setError('');
                localStorage.setItem('Authorization', `Bearer ${data.token}`);
                localStorage.setItem('User', JSON.stringify(data.user));
                navigate('/');
                //redirect
            } else {
                setError(data.message)
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    return <Layout>
        <div className='loginPage'>
            <h1>Login</h1>
            <form onSubmit={login}>
                <div className='inputs'>
                    <div className='formSection'>
                        <label htmlFor='username'>Username</label>
                        <input id='username' type='text' name='username' required></input>
                    </div>
                    <div className='formSection'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' required></input>
                    </div>
                </div>
                <button>Login</button>
                <div className='registerNow'>
                    If you don't have an account, register here!
                <button type='button' onClick={()=> {navigate('/register')}}>Register Now</button>
                </div>
            </form>
            {(error ? (<div className='error'>
                <p>{error}</p>
            </div>) : '')}
            
        </div>
    </Layout>
}

export default Login;