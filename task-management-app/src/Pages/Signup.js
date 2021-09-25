import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Signin.css'

const Signup = ({ history }) => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

  

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/')
        }
    },[])

    const onSignup = () => {
        setLoading(true);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => history.push('/signin'))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="main-container">
            <div className="container">
                <div className="">
                    <label className="">Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name="name"
                        type="name"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="">
                    <label className="">Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        className=""
                    />
                </div>
                <div className="">
                    <label className="">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        className=""
                    />
                </div>
                <div className="">
                    <button
                        onClick={onSignup}
                        className="btn-ls"
                    >
                        { loading ? 'Creating user ...' : 'Signup'}
                    </button>
                </div>
                <div className="">
                    <Link to="/signin" style={{textDecoration:  "none",   color: "blue"}}>
                        Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;