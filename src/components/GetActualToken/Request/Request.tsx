import React, {FC} from 'react';
import {Button, Flex} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

export interface LoginRequestBody {
  userEmail : string
  password : string
}

export interface LoginRequest {
  url : string
  body : LoginRequestBody
}

interface RequestProps {
  request : LoginRequest
}

const Request: FC<RequestProps> = ({request}) => {
  return (
      <Flex justify={"space-between"} style={{width: "100%"}} gap={10}>
        <Flex>
          <span>{request.url}</span>
        </Flex>

        <Flex>
          <Button>Details</Button>
          <Button danger icon={<DeleteOutlined/>}/>
        </Flex>
      </Flex>
  );
};

export default Request;