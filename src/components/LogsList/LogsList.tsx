import React, {FC} from 'react';
import {Button, Flex, List} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import LogItem, {ILogItem} from "../LogItem/LogItem.tsx";


interface LogsListProps {
  messages: ILogItem[]
  setMessages: (value: (((prevState: ILogItem[]) => ILogItem[]) | ILogItem[])) => void
}

const LogsList:FC<LogsListProps> = ({messages, setMessages}) => {
  return (

        <Flex className={"logsList"} gap={5} style={{
          backgroundColor: "white",
          padding: 10,
          overflowY: "scroll",
          overflowX: "scroll",
          width: 600
        }}>
          <Flex style={{position: "sticky", top: 0}}>

            <Button icon={<DeleteOutlined style={{fontSize: 20}}/>}
                    title={"Clear all"}

                    onClick={() => setMessages([])}
            />
          </Flex>

          <List dataSource={messages}
                renderItem={(item) => (
                    <List.Item key={"log-" + Math.random()}
                               style={{padding: 2, margin: 1, fontSize: 20}}
                               className={"pt-sans-regular"}>

                      <LogItem logItem={item}/>
                    </List.Item>
                )}
          />
        </Flex>


  );
};

export default LogsList;