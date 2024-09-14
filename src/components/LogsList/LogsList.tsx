import React, {FC} from 'react';
import {Button, ConfigProvider, Empty, Flex, List, Space} from "antd";
import {DeleteOutlined, VerticalAlignMiddleOutlined} from "@ant-design/icons";
import LogItem, {ILogItem} from "../LogItem/LogItem.tsx";


interface LogsListProps {
  messages: ILogItem[]
  setMessages: (value: (((prevState: ILogItem[]) => ILogItem[]) | ILogItem[])) => void
}

const LogsList: FC<LogsListProps> = ({messages, setMessages}) => {
  return (
      <Flex className={"logsList"} gap={5} style={{
        scrollbarWidth: "thin",
        // backgroundColor: "#F4F5F6",
        backgroundColor: "#202f64",
        padding: 10,
        overflowY: "scroll",
        overflowX: "scroll",
        width: 600
      }}>

        <ConfigProvider renderEmpty={() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                  description={<span style={{color: "var(--input-text-color)"}}>No activity</span>}/>}>
          <List dataSource={messages}
                renderItem={(item) => (
                    <List.Item key={"log-" + Math.random()}
                               style={{padding: 2, margin: 1, fontSize: 20}}
                               className={"pt-sans-regular"}>

                      <LogItem logItem={item}/>
                    </List.Item>
                )}
                header={<>
                  <Flex gap={5}>
                    <Button icon={<DeleteOutlined style={{fontSize: 20}}/>}
                            title={"Clear all"}

                            onClick={() => setMessages([])}
                    />
                    <Button title={"collaseAll"}  icon={<VerticalAlignMiddleOutlined />}/>
                  </Flex>
                </>}
          />
        </ConfigProvider>
      </Flex>
  );
};

export default LogsList;