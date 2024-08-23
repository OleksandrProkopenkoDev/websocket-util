import React, {useState} from 'react';
import {Button, Modal} from "antd";

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
        >
          <p>A web tool designed to simplify the testing and debugging of <a href="https://docs.spring.io/spring-framework/reference/web/websocket/stomp.html">STOMP</a>  endpoints.</p>
          <p>Version 2.1</p>
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