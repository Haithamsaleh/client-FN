import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, CheckOutlined, DownloadOutlined , FrownOutlined, MehOutlined, SmileOutlined  } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch, Button, Drawer, Input, DatePicker, Select, Steps, Row, Col, Divider, Rate } from 'antd';
import './style.css'

import Swal from "sweetalert2";


const BASE_URL = 'http://localhost:4000';


const { Step } = Steps;
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const Home = () => {
  const { id } = useParams();
  const [Task, setTask] = useState([]);

  const [visible, setVisible] = useState(false);


  const [tasks, setTasks] = useState("");
  const [completeBy, setCompleteBy] = useState("");
  const [importance, setImportance] = useState("");


  const [current, setCurrent] = useState(0);



  useEffect(() => {
    getTask();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (value) => {
    console.log('onChange:', current);
    setCurrent(value);
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

  const delTask = async (id) => {
    const res = await axios.delete(`${BASE_URL}/deltasks/${id}`, {
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
            placeholder='newtask'
            bg="white"
            id="text"
            type="text"
            onChange={(e) => setTasks(e.target.value)}
          />
          <DatePicker placeholder='Date com' onChange={(e) => setCompleteBy(e.target)} />
          <Input
            placeholder='impo'
            bg="white"
            id="text"
            type="text"
            onChange={(e) => setImportance(e.target.value)}
          />
          <Button type="primary" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={newTask}
          >
            {" "}
            Post
          </Button>
        </Drawer>
      </div>
      <Button type="primary" shape="round" icon={<DownloadOutlined />} />
      <hr />

      {Task.map((item, I) => {

        // console.log(item._id);
        if (item.complete == false && item.isdone == false) {
          return <div style={{ margin: '16px 16px 16px 16px' }} key={I}>
            <h2>name: {item.task}</h2>
            <h2>date: {item.date}</h2>
            <p>{item.importance}</p>
            <br/>
            <Steps  current={item.importance} onChange={onChange}>
        <Step title="Step 1" description="This is a description." />
        <Step title="Step 2" description="This is a description." />
        <Step title="Step 3" description="This is a description." />
        <Step  onClick={() => {
          taskdone(item._id);
        }} title="Step 3" description="This is a description." />
      </Steps>
      <Rate disabled allowHalf  defaultValue={item.importance} />
      <br/>
      <Rate disabled defaultValue={item.importance} character={({ index }) => customIcons[index + 1]} />
<br/>
            <Button icon={<CheckOutlined style={{ color: "white" }} />
            }
            
            style={{ background: "green", borderColor: "white" }}
            onClick={() => {
              taskdone(item._id);
            }}
            
            />
               
            <Button icon={<DeleteOutlined style={{ color: "white" }} />}

style={{ background: "red", borderColor: "white" }}
onClick={() => {
  delTask(item._id);
}}

/>
            <hr />

            <br />


          </div>;

} else {
  return (
    

    <div style={{ margin: '16px 16px 16px 16px' }} key={I}>
                <del>

              <h2 style={{ color: "red" }}>name: {item.task}</h2>
              <h2 style={{ color: "red" }}>date: {item.date}</h2>
              <p style={{ color: "red" }}>{item.importance}</p>
              <Rate disabled allowHalf  defaultValue={item.importance} />
              <br/>
              <Rate disabled defaultValue={item.importance} character={({ index }) => customIcons[index + 1]} />

                </del>
                <br/>




              <Button icon={<DeleteOutlined style={{ color: "white" }} />}

style={{ background: "red", borderColor: "white" }}
onClick={() => {
  delTask(item._id);
}}

/>
              
              <hr />
            </div>
          );
        }

      })}
    </>
  );
};
export default Home;
//stoped here :need to make steps fun 