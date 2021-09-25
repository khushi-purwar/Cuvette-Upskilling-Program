import React, {useState, useEffect} from 'react'
import {get ,ref, child} from 'firebase/database';

import fireDB from '../firebase';
import {  remove } from "firebase/database";
import {Link, } from 'react-router-dom';
import './Home.css';


const Home = () => {

    const [data, setData] = useState({});
    // const history = useHistory();
    const token = localStorage.getItem('token');
  
    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (!token) {
    //         history.push('/')
    //     }
    // },[])

    useEffect (( )=>{
        const dbRef = ref(fireDB);
        get(child(dbRef, `tasks`)).then((snapshot) => {
            if(snapshot.val()!==null){
                setData( snapshot.val());
            }else
                setData({});
        }).catch((error) => {
          console.error(error);
        });
    } , [] )
    

    const onDelete = (id)=>{
        if(window.confirm("Are you sure that you want to delete the task? "))
        remove( ref(fireDB, `/tasks/${id}`));
        window.location.reload();
    }
    return (

     
        
        <div>
            {
                token ? 
                <div style={ {marginTop: "100px"} }>
            <table className="styled-table">
                <thead>
                    <tr>
                    <th style={{textAlign: 'center'}}>SNo.</th>
                    <th style={{textAlign: 'center'}}>Task Title</th>
                    <th style={{textAlign: 'center'}}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                  {Object.keys(data).map (( id, index) => (
                      <tr key={id}>
                          <th scope="row">{index+1}</th>
                          <td>{data[id].title}</td>
                          <td>
                          <Link to={`/view/${id}`}>
                                 <button className="btn btn-view">View</button>
                              </Link>
                              <Link to={`/update/${id}`}>
                                 <button className="btn btn-edit">Edit</button>
                              </Link>
                        
                              <button className="btn btn-delete" onClick ={ ()=>onDelete(id)}>
                                  Delete
                                </button>
                          </td>
                      </tr>
    ))}
                </tbody>

            </table>
           
        </div>
                :
               
                <p  style={{fontSize : "30px", textAlign:"center"}}> Please sign in !!!</p>
            }
        </div>
    )
}

export default Home
