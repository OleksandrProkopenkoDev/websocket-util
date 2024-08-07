import React, {FC, useEffect, useState} from 'react';
import {Button, Flex, Input, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {getAllHandshakesUrls, removeHandshakeUrlItem} from "../../api/HandshakeUrlService.ts";

interface HandshakeInputProps {
  handshakeUrl : string
  isConnected : boolean
  setHandshakeUrl: (value: (((prevState: string) => string) | string)) => void
}

const HandshakeInput:FC<HandshakeInputProps> = ({handshakeUrl, setHandshakeUrl, isConnected}) => {
  const [handshakesUrlList, setHandshakesUrlList] = useState<string[]>([])

  const onRemove = (url : string) => {
    setHandshakesUrlList((prevState) => prevState.filter((e) => e !== url))
    removeHandshakeUrlItem(url)
  }

  useEffect(() => {
    let arr = getAllHandshakesUrls();
    if (arr[0]) {
      setHandshakeUrl(arr[0])
    }
    setHandshakesUrlList(arr)
  }, [localStorage.getItem("handshakeUrls")]);

  const renderOption = (value : string) => {
    return <Flex gap={5}
                 align={"center"}
                 justify={"space-between"}
    >
                <span className={"pt-sans-regula"}
                      style={{fontSize: 18}}>
                  {value}
                </span>
      <Button danger
              onClick={() => onRemove(value)}
              icon={<CloseOutlined/>}
      />
    </Flex>;
  }

  return (
      <Flex style={{fontSize: 20}} align={"center"} className={"pt-sans-regular"}>
        <label>Handshake url: </label>
        <Select
            disabled={isConnected}
            optionRender={(option) => renderOption(option.value as string)}
            value={''}
            onSelect={(value) => {
              setHandshakeUrl(value)
            }}
            dropdownStyle={{width: 500}}
            options={handshakesUrlList.map((item) => ({
              value: item,
              label: item,
            }))}
        />
        <Input style={{fontSize: 20, maxWidth: 350}}
               className={"pt-sans-regular"}
               disabled={isConnected}
               value={handshakeUrl}
               onChange={(e) => setHandshakeUrl(e.target.value)}
        />
      </Flex>
  );
};

export default HandshakeInput;