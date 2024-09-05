import React, {useState} from 'react';
import {Button, Modal} from "antd";

const GetActualTokenModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
      <>
        <Button onClick={() => setIsOpen(true)}
                style={{marginLeft: "5"}}
        >Get actual</Button>

        <Modal title={"Get an actual authorization token"}
               onCancel={() => setIsOpen(false)}
               open={isOpen}>


        </Modal>
      </>

  );
};

export default GetActualTokenModal;