import React  ,{ useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { getAuth, onAuthStateChanged } from 'firebase/auth';



// pages
import Home from "./Pages/Home";
import AddEdit from "./Pages/AddEdit";
import View from "./Pages/View";
import About from "./Pages/About";
import SignUp from './Pages/Signup';
import SignIn from './Pages/Signin';


// components
import Navbar from "./Components/Navbar";


function App() {

 const [user, setUser] = useState(null);

 useEffect(( )=>{
   const auth= getAuth();
   onAuthStateChanged(auth , user => {
     setUser(user);
   })
 })
  return (
    <BrowserRouter>
      <div>
        <Navbar />
      
        <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/add" component={AddEdit} />
           <Route path="/update/:id" component={AddEdit} /> 
           <Route path="/view/:id" component={View} />
           <Route path="/about" component={About} />
           <Route path="/signup" component={SignUp} />
           <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
