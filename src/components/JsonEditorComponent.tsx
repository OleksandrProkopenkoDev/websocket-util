import React, {FC, useEffect, useState} from 'react';
import {Flex, Segmented} from "antd";
import {DestinationListItem, updateDestination} from "../api/DestinationService.ts";

interface JsonEditorComponentProps {
  isConnected: boolean
  onSendMessage: () => void
  setJsonData: (value: (((prevState: {}) => {}) | {})) => void
  selectedDestination: DestinationListItem
  setSelectedDestination: (value: (((prevState: (DestinationListItem | undefined)) => (DestinationListItem | undefined)) | DestinationListItem | undefined)) => void
}

const JsonEditorComponent: FC<JsonEditorComponentProps> = ({setJsonData,
                                                             selectedDestination,
                                                             setSelectedDestination
                                                           }) => {

  const [selectedTemplate, setSelectedTemplate] = useState<string>()
  const [templateIndex, setTemplateIndex] = useState<number>(0)
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout>()
  const [segmentValue, setSegmentValue] = useState(0)

  useEffect(() => {
    if (selectedTemplate) {
      setJsonData(selectedTemplate)
    }
  }, [selectedTemplate]);

  const handleChange = (e: any) => {
    let newVal = e.target.value
    setSelectedTemplate(newVal);
    clearTimeout(saveTimeout)
    let timeout = setTimeout(() => {
      selectedDestination.jsonTemplates[templateIndex].json = newVal
      updateDestination(selectedDestination)
    }, 1000)
    setSaveTimeout(timeout);
  };


  useEffect(() => {
    if (selectedDestination) {
      setSegmentValue(0)
      setSelectedTemplate(selectedDestination.jsonTemplates[0].json)
    } else {
    }
  }, [selectedDestination]);

  function isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;  // JSON is valid
    } catch (error) {
      return false; // JSON is invalid
    }
  }

  return (
      <Flex vertical
            gap={5}
            style={{maxWidth: 600, minHeight: 300}}
      >
        <Flex className={"pt-sans-regular"}
              gap={5}
              align={"center"}
              justify={"space-between"}
              style={{width: "100%"}}
        >
          <span  className={"text"} style={{fontSize: 25, fontWeight: "bold"}}>JSON Editor</span>
        </Flex>

        <Flex vertical
              className={"editor"}
              style={{fontSize: 20}}
        >
          <Flex gap={10} justify={"space-between"}>
            <Flex>
              {selectedDestination?.jsonTemplates &&
                  <Segmented style={{maxWidth: 200}}
                             value={segmentValue}
                             onChange={(value) => {
                               setSegmentValue(value as number)
                               if (selectedTemplate != null) {
                                 selectedDestination.jsonTemplates[templateIndex].json = selectedTemplate;
                                 setSelectedDestination(selectedDestination)
                               }
                               setSelectedTemplate(selectedDestination.jsonTemplates[value].json)
                               setTemplateIndex(value as number)
                             }}
                             options={selectedDestination.jsonTemplates.map((e, index) => index)}
                  />
              }
            </Flex>
            <span
                className={"pt-sans-regular text"} style={{color: "var(--input-text-color)"}} >json is valid {isValidJSON(selectedTemplate) === true ?
                <span>🟢</span> : <span>🔴</span>}</span>
          </Flex>
          <pre style={{margin: 0}}>
          <textarea cols={5}
                    rows={9}
                    value={selectedTemplate}
                    className={"pt-sans-regular"}
                    onChange={handleChange}
                    style={{
                      border: "none",
                      scrollbarWidth: "thin",
                      fontSize: 20,
                      maxHeight: 400,
                      backgroundColor: "var(--input-bg-color)",
                      color: "var(--input-text-color)"
                    }}>
          </textarea>
          </pre>
        </Flex>
      </Flex>
  );
};

export default JsonEditorComponent;
