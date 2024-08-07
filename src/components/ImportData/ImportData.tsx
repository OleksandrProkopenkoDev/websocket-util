import React from 'react';
import {Button} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const ImportData = () => {
  return (
      <Button icon={<UploadOutlined />}>Import</Button>
  );
};

export default ImportData;