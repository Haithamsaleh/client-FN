import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined , CheckOutlined, DownloadOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch ,Button,  Drawer , Input } from 'antd';
import './style.css'

const BASE_URL = 'http://localhost:4000';



const Home = () => {
  const { id } = useParams();
  const [Task, setTask] = useState([]);

  const [visible, setVisible] = useState(false);


  const [tasks, setTasks] = useState("");
  const [completeBy, setCompleteBy] = useState("");
  const [importance, setImportance] = useState("");



  
    
    useEffect(() => {
      getTask();
    },[]);
  
    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };

const newTask = async () => {
  try { 
    await axios.post(`${BASE_URL}/newtask`,
    {
      task: tasks,
      completeBy: completeBy,
      importance: importance,
    },
      //{
      // headers :{
      //   Authorization: `Bearer ${state.token}`,
      // }
    )
    Swal.fire({
      position: "center",
      icon: "success",
      title: "task successfule ",
      showConfirmButton: false,
      timer: 2500,
    });
    navigate(`/`);
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Opss...! ,something wrong",
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

  
  const getTask = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/tasks`);
console.log(result.data);
      setTask(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const taskdone = async (id) => {
    const res = await axios.put(`${BASE_URL}/task/${id}`, {
    });
    getTask();
  };

const  delTask = async (id) => { 
  const res = await axios.delete(`${BASE_URL}/deltasks/${id}`,{
  });
  getTask();
}; 




return (
  <>
   <div className="site-drawer-render-in-current-wrapper">
      Render in this
      <div
        style={{
          marginTop: 16,
        }}
      >
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        width={'100%'}
        style={{
          position: 'absolute',
        }}
      >
<Input
                    bg="white"
                      id="text"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />        <Button type="primary" onClick={onClose}>
        Close
        </Button>
      </Drawer>
    </div>
        <Button type="primary" shape="round" icon={<DownloadOutlined />}  />
        <hr/>

  {Task.map((item, I) => {
    // console.log(item._id);
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
            
            <Button icon={<CheckOutlined style={{ color: "white" }}/>}

style={{ background: "green", borderColor: "white" }}
onClick={() => {
  taskdone(item._id);
  }}
  
/>
<Button icon={<DeleteOutlined style={{ color: "white" }}/>}

style={{ background: "red", borderColor: "white" }}
onClick={() => {
  delTask(item._id);
  }}
  
/>

 



            <hr />
          </div>
        );}
      })}
  </>
  );
  };
  export default Home;
//stoped here need to make  form for addtask 