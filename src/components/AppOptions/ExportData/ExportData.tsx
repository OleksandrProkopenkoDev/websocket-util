import React from 'react';
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {exportAllDataAsJson} from "../../../api/DataService.ts";

const ExportData = () => {

  /**
   * Create a Blob object with the JSON data
   * Create a link element
   * Append the link to the body (required for Firefox)
   * Programmatically click the link to trigger the download
   * Remove the link from the body
   */
  const onExport = () => {
    let json = exportAllDataAsJson()
    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = new Date().toDateString() + '-data.json'; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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