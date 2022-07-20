import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch  } from 'antd';
const { Meta } = Card;


const Home = () => {
    const [loading, setLoading] = useState(true);

    const onChange = (checked) => {
      setLoading(!checked);
    };
  
    return (
      <>
  
        <Card
          style={{
            width: 300,
            marginTop: 16,
          }}
          loading={loading}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
  
        <Card
          style={{
            width: 300,
            marginTop: 16,
          }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      </>
    );
  };
  export default Home;