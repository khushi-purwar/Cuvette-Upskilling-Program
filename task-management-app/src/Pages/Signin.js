import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Signin.css'

const SignIn = ({ history }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

  

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/')
        }
    },[])

    const onLogin = () => {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                history.push('/')
            })
            .catch(e => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="main-container">
            <div className="container">
                <div className="email-input">
                    <label className="">Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        className=""
                        placeholder="Enter email id"
                    />
                </div>
                <div className="password-input">
                    <label className="">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        className=""
                        placeholder = "Enter password"
                    />
                </div>

                <div className="">
                    <button
                        onClick={onLogin}
                        className="btn-ls"
                      
                    >
                        {loading ? 'Logging you in ...' : 'Login'}
                    </button>
                </div>
                <div className="link">
                    <Link to="/signup" style={{textDecoration:  "none",   color: "blue"}}>
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;