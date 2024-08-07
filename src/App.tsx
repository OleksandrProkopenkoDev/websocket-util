import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import ManageBar from "./components/ManageBar/ManageBar.tsx";
import {Button, Flex, List} from "antd";
import {Subscription} from "./types/Subscription.ts";
import {CloseOutlined, DeleteOutlined, DownloadOutlined} from "@ant-design/icons";
import LogItem, {ILogItem} from "./components/LogItem/LogItem.tsx";
import AboutModal from "./components/AboutModal/AboutModal.tsx";
import ImportData from "./components/ImportData/ImportData.tsx";
import ExportData from "./components/ExportData/ExportData.tsx";

function App() {
  const [messages, setMessages] = useState<ILogItem[]>([]);
  const subscriptionListRef = useRef<HTMLUListElement | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  return (
      <Flex vertical style={{height: "100vh"}}>
        <Flex style={{position: "absolute", right:0, top: 0}}>
          <ImportData/>
          <ExportData/>
          <AboutModal/>
        </Flex>

        <h1 style={{marginLeft: 20}}>WebSocket Test</h1>
        <Flex style={{padding: "0 20px"}}>
            <ManageBar messages={messages}
                       setMessages={setMessages}
                       subscriptionListRef={subscriptionListRef}
                       subscriptions={subscriptions}
                       setSubscriptions={setSubscriptions}
            />
        </Flex>
        <Flex gap={5} style={{backgroundColor: "white", padding: 10, height : "100%", overflowY: "scroll"}}>
          <Flex style={{position: "sticky", top: 0}}>

            <Button icon={<DeleteOutlined style={{fontSize: 20}} />}
                    title={"Clear all"}

                    onClick={() => setMessages([])}
            />
          </Flex>

         <List dataSource={messages}
               renderItem={(item) => (
                   <List.Item key={"log-" + Math.random()} style={{padding: 2, margin: 1, fontSize: 20}}
                              className={"pt-sans-regular"}>

                     <LogItem logItem={item}/>
                   </List.Item>
               )}
         />
        </Flex>
      </Flex>
  );
}

export default App;
