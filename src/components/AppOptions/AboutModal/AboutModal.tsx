import React, {useState} from 'react';
import {Button, Divider, Modal} from "antd";

const AboutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
      <>
        <Button onClick={showModal}>About tool</Button>
        <Modal title="About tool"
               open={isModalOpen}
               onOk={handleOk}
               onCancel={handleCancel}
               footer={<Button type={"primary"} onClick={() => setIsModalOpen(false)}>Ok</Button>}
        >
          <p>A web tool designed to simplify the testing and debugging of <a href="https://docs.spring.io/spring-framework/reference/web/websocket/stomp.html">STOMP</a>  endpoints.</p>
          <p>Version 3.0</p>
          <Divider orientation={"left"}>Last changes</Divider>
          <dl>
            <dt style={{fontWeight: "bold"}}>Added ability to get actual token from HTTP requests</dt>
            <dd>Token expiration/validity indication</dd>
            <dd>Ability to change old token to a new from request</dd>
            <dd>Ability to delete token</dd>

            <dt style={{fontWeight: "bold"}}>New design</dt>
            <dd>New color pallet</dd>
            <dd>Add header to logs list. New functionality for logs. 'Collapse all' button</dd>
          </dl>


          <p>Repository <a href="https://github.com/OleksandrProkopenkoDev/websocket-util">https://github.com/OleksandrProkopenkoDev/websocket-util</a> </p>
          <p>Authors: </p>
          <ul>
            <li><a href="https://github.com/OleksandrProkopenkoDev">Oleksandr Prokopenko</a></li>
            <li><a href="https://github.com/LiashenkoAndrey">Andrew Liashenko</a></li>
          </ul>
        </Modal>
      </>
  );
};

export default AboutModal;