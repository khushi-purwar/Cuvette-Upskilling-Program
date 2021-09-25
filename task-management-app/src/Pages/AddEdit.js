import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./AddEdit.css";

import { ref, set, push , get, child} from "firebase/database";
import fireDB from "../firebase";


const intialState = {
  title: "",
  description: "",
  date: "",
};

const AddEdit = () => {
  const [state, setState] = useState(intialState);
  const [data, setData] = useState({});

  const { title, description, date } = state;

  const history = useHistory();
  const { id } = useParams();

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
} , [id] )

  useEffect(() => {
    if (id) {
      setState({...data[id]});
    } else {
      setState({...intialState});
    }

    return () => {
      setState({...intialState});
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      window.alert("Please provide value in each input field!");
    } else {
      if (id) {
        set(ref(fireDB, `tasks/${id}`), {
          ...state,
        });
      
      } else {
        push(ref(fireDB, "tasks"), {
          ...state,
        });
        
      }
      setTimeout(() => history.push("/"), 500);
    }
  };

  return (
    <div styles={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Title"
          value={title || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows="10"
          cols="40"
          id="description"
          placeholder="Enter Description"
          name="description"
          value={description || ""}
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
