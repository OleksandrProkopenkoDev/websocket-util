import React, {FC} from 'react';
import {Button, Flex, Input, Select} from "antd";
import {
  DestinationListItem,
  removeDestinationsItem,
  UpdateDestination
} from "../../api/DestinationService.ts";
import {CloseOutlined} from "@ant-design/icons";

interface DestinationInputProps {
  destination: string
  setDestination: (value: (((prevState: string) => string) | string)) => void
  destinationsList: DestinationListItem[]
  setSelectedDestination: (value: (((prevState: (DestinationListItem | undefined)) => (DestinationListItem | undefined)) | DestinationListItem | undefined)) => void
}


const DestinationInput: FC<DestinationInputProps> = ({
                                                       destinationsList,
                                                       setDestination,
                                                       destination,
                                                       setSelectedDestination
                                                     }) => {
  return (
      <Flex style={{fontSize: 20}} className={"pt-sans-regular"} align={"center"}>
        <label htmlFor="destination">Destination: </label>
        <Select
            optionRender={(option) => {
              return <Flex gap={5} align={"center"} justify={"space-between"}>
                <span className={"pt-sans-regula"} style={{fontSize: 18}}>{option.label}</span>
                <Button danger onClick={() => removeDestinationsItem(option.value as string)}
                        icon={<CloseOutlined/>}/>
              </Flex>;
            }}
            value={""}
            onSelect={(value) => {
              console.log(value, destinationsList.find((e) => e.destination === value))
              let newDest = destinationsList.find((e) => e.destination === value);
              if (newDest) {
                newDest.addedOn = new Date()
                UpdateDestination(newDest)
              }
              setSelectedDestination(newDest)
              setDestination(value)
            }}
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
      </Flex>
  );
};

export default DestinationInput;