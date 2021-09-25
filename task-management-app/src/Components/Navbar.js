import React, {useEffect, useState} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';

import { getAuth, signOut  } from 'firebase/auth';
import './Navbar.css'

const Navbar = () => {

    const [activeTab , setActiveTab] = useState("Home");
    const location  = useLocation();

    const auth  =getAuth();
    const user = auth.currentUser;
    const token = localStorage.getItem('token');
  
   const history = useHistory();
   
    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('token')
                history.push('/signin')
            })
            .catch((e) => alert(e.message))
    }



    useEffect (( )=>{
        if(location.pathname === '/')
        setActiveTab("Home");
        else if(location.pathname === '/about')
        setActiveTab("About");
        else if(location.pathname === '/addTask')
        setActiveTab("AddTask");
        else if(location.pathname === '/signin')
        setActiveTab("SignIn");
        
   
    },  [location])

    return (
        <div className="navbar">
            <p className="logo">Tasky</p>
          
           { token ? 
            <div className="right-navbar">
                <Link to="/">
                    <p 
                      className={`${activeTab === "Home" ? "active" : "" }`}
                      onClick={ ()=> setActiveTab("Home") }
                    >Home
                    </p>
                </Link>
                <Link to="/about">
                    <p 
                      className={`${activeTab === "About" ? "active" : "" }`}
                      onClick={ ()=> setActiveTab("About") }
                    >About
                    </p>
                </Link>
                <Link to="/add">
                    <p 
                      className={`${activeTab === "AddTask" ? "active" : "" }`}
                      onClick={ ()=> setActiveTab("AddTask") }
                    >Add Task
                    </p>
                </Link>

                <p>{user && user.displayName}</p>

                <Link to="/signin">
                    <p 
                      className={`${activeTab === "Logout" ? "active" : "" }`}
                      onClick={ ()=> logout() }>Logout
                    </p>
                </Link>
              
            </div>
           :   <div className="right-navbar">

                <Link to="/signin">
                    <p 
                      className={`${activeTab === "SignIn" ? "active" : "" }`}
                      onClick={ ()=> setActiveTab("SignIn") }>SignIn
                    </p>
                </Link>
              
            </div> }

        </div>
           
    )
}

export default Navbar
