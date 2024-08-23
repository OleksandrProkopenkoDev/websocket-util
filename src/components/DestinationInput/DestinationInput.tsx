import React, {FC} from 'react';
import {Button, Flex, Input, Select} from "antd";
import {
  DestinationListItem,
  removeDestinationsItem,
  UpdateDestination
} from "../../api/DestinationService.ts";
import {CloseOutlined} from "@ant-design/icons";

interface DestinationInputProps {
  isConnected: boolean
  onSendMessage: () => void
  destination: string
  setDestination: (value: (((prevState: string) => string) | string)) => void
  destinationsList: DestinationListItem[]
  setSelectedDestination: (value: (((prevState: (DestinationListItem | undefined)) => (DestinationListItem | undefined)) | DestinationListItem | undefined)) => void
}


const DestinationInput: FC<DestinationInputProps> = ({isConnected,
                                                       onSendMessage,
                                                       destinationsList,
                                                       setDestination,
                                                       destination,
                                                       setSelectedDestination
                                                     }) => {

  const onSelect = (value : string) => {
    let newDest = destinationsList.find((e) => e.destination === value);
    if (newDest) {
      newDest.addedOn = new Date()
      UpdateDestination(newDest)
    }
    setSelectedDestination(newDest)
    setDestination(value)
  }

  const renderOption = (value : string) => {
    return <Flex gap={5} align={"center"} justify={"space-between"}>
      <span className={"pt-sans-regula"} style={{fontSize: 18}}>{value}</span>
      <Button danger onClick={() => removeDestinationsItem(value as string)}
              icon={<CloseOutlined/>}/>
    </Flex>
  }

  return (
      <Flex style={{fontSize: 20}}  className={"pt-sans-regular"} align={"center"}>
        <label htmlFor="destination" style={{marginRight: 10}}>Destination: </label>
        <Select
            optionRender={(option) => renderOption(option.value as string)}
            value={""}
            onSelect={onSelect}
            optionFilterProp="label"
            dropdownStyle={{width: 500}}
            options={destinationsList.map((item) => ({
              value: item.destination,
              label: item.destination,
            }))}
        />
        <Input style={{fontSize: 20, maxWidth: 350}} className={"pt-sans-regular"}
               type="text"
               id="destination"
               value={destination}
               onChange={(e) => setDestination(e.target.value)}
        />

        <Button type={"primary"}
                style={{marginLeft: 10}}
                onClick={onSendMessage}
                disabled={!isConnected}
        >Send Message</Button>
      </Flex>
  );
};

export default DestinationInput;