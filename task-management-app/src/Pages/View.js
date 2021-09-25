import React, {useState, useEffect} from 'react';
import './View.css';
import fireDB from '../firebase';
import { useParams, Link } from 'react-router-dom';
import { ref, get, child} from "firebase/database";

const View = () => {

    const [task , viewTask] = useState({});


    const {id} = useParams;

    useEffect ( ()=>{
        const dbRef = ref(fireDB);
        
        get(child(dbRef,`tasks`)).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                viewTask( snapshot.val());
            }else{
                viewTask({});
            }
            
        }).catch((error) => {
          console.error(error);
        });
    }, [id])


   
    return (
        <div style= {{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Task Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>TaskTitle:</strong>
                    <span>{task.title}</span>
                    <br />
                    <br />
                    <strong>Description:</strong>
                    <span>{task.description}</span>
                    <br />
                    <br />
                    <strong>Date:</strong>
                    <span>{task.date}</span>
                    <br />
                    <br />

                    <Link to="/">
                    <button className="btn btn-edit">Go Back</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default View;
