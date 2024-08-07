import React, {FC} from 'react';
import {Button, Flex} from "antd";

interface ConnectBtnProps {
  onConnect: () => void
  isConnected: boolean
  isConnection: boolean
  status: string
}

const ConnectBtn: FC<ConnectBtnProps> = ({onConnect, isConnection, isConnected, status}) => {
  return (
      <Flex gap={5} align={"center"}>
        <div style={{fontSize: 20}} className={"pt-sans-regular"}>
          <label htmlFor="status">Status: </label>
          <span id="status">{status}</span>
        </div>
        <Button type={"primary"}
                danger={isConnected}
                onClick={onConnect}
                // disabled={isConnected}
                loading={isConnection}>{isConnected ? "Disconnect" : "Connect"}</Button>
      </Flex>
  );
};

export default ConnectBtn;