import React, {useRef} from 'react';
import {Button, notification} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {importAllData} from "../../../api/DataService.ts";

const ImportData = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Get the selected file
   * Define onload event
   * Parse the JSON data
   * Define onerror event
   * Read the file as text
   * @param event
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (typeof e.target.result === "string") {
            const result = JSON.parse(e.target.result);
            importAllData(result)
            window.location.reload();

          }
        } catch (err) {
          notification.warning({message: "Error parsing JSON file"})
        }
      };
      reader.onerror = () => {
        notification.warning({message: "Error reading file"})
      };
      reader.readAsText(file);
    }
  };

  const onClick = () => {
    if (inputRef.current) {
      if ("click" in inputRef.current) {
        inputRef.current.click()
      }
    }
  }

  return (
      <>
        <input ref={inputRef}
               type="file"
               accept=".json"
               onChange={handleFileChange}
               style={{display: "none"}}
        />
        <Button onClick={onClick} title={"import data from json file"}
                icon={<UploadOutlined/>}>Import</Button>
      </>
  );
};

export default ImportData;