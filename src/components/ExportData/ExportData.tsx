import React from 'react';
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";

const ExportData = () => {


  const onExport = () => {

  }

  return (
      <Button onClick={onExport}
              title={"export data"}
              icon={<DownloadOutlined />}
      >
        Export
      </Button>
  );
};

export default ExportData;