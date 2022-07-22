import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch  } from 'antd';

const BASE_URL = 'http://localhost:4000';



const Home = () => {
  const { id } = useParams();
  const [Task, setTask] = useState([]);



  
    
    useEffect(() => {
      getTask();
    },[]);
  
  



  
  const getTask = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/tasks`);
console.log(result.data);
      setTask(result.data);
    } catch (error) {
      console.log(error);
    }
  };
return (
  <>
  
  {Task.map((item, I) => {
    
    if (item.complete == false && item.isdone == false) {
      return <h2 key={I}>
           <h2>name: {item.task}</h2>
            <h2>date: {item.date}</h2>
            <p>{item.importance}</p>
            <hr/>
      </h2>;
    }else{
        return (
          
          
          <div key={I}>
            
            <h2 style={{color: "red"}}>name: {item.task}</h2>
            <h2 style={{color: "red"}}>date: {item.date}</h2>
            <p style={{color: "red"}}>{item.importance}</p>
            
 



            <hr />
          </div>
        );}
      })}
  </>
  );
  };
  export default Home;
  // stoped here 