import { useNavigate } from "react-router-dom";
import { easyFetch } from "./helperFunctions";
import { useState, useEffect } from "react";
import Layout from './Layout';

function Register() {

    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    useEffect(()=> {
        if (localStorage.getItem('User')) {
            navigate('/');
            return;
        }
    }, [navigate]);
    function createAccount(e) {
        e.preventDefault()
        console.log(e.target.password.value)
        console.log(e.target.confirmPassword.value)
        if (e.target.password.value !== e.target.confirmPassword.value) {
            setErrors('Passwords do not match.')
            return;
        }

        easyFetch('/register', 'POST', {
            username: e.target.username.value,
            password: e.target.password.value

        }).then((data) => {
            if (data.success) {
                localStorage.setItem('Authorization', `Bearer ${data.token}`)
                localStorage.setItem('User', JSON.stringify(data.user));
                navigate('/');
            } else {
                setErrors(data.message)
            }
        })
    }
    return <Layout>
        <div className='registerPage'>
            <h1>Create Account</h1>
            <form onSubmit={createAccount} onChange={()=> {setErrors('')}}>
                <div className='inputs'>
                <div className='formSection'>
                <label htmlFor='username'>Username</label>
                    <input id='username' type='text' required name='username' minLength='3'></input>
                </div>
                <div className='right'>
                <div className='formSection'>
                <label htmlFor='password'>Password</label>
                    <input id='password' type='password' required name='password' minLength='6'></input>
                </div>
                <div className='formSection'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input id='confirmPassword' type='password' required name='confirmPassword'></input>
                </div>
                </div>
                </div>
                <button>Submit</button>
            </form>
            {errors ? <p>{errors}</p> : ''}
        </div>
    </Layout>
}

export default Register;