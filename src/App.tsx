import React, {useRef, useState} from 'react';
import './App.css';
import ManageBar from "./components/ManageBar/ManageBar.tsx";
import {ConfigProvider, Flex} from "antd";
import {Subscription} from "./types/Subscription.ts";
import {ILogItem} from "./components/LogItem/LogItem.tsx";
import AboutModal from "./components/AboutModal/AboutModal.tsx";
import ImportData from "./components/ImportData/ImportData.tsx";
import ExportData from "./components/ExportData/ExportData.tsx";
import LogsList from "./components/LogsList/LogsList.tsx";

function App() {
  const [messages, setMessages] = useState<ILogItem[]>([]);
  const subscriptionListRef = useRef<HTMLUListElement | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  return (
      <Flex className={"mainWrapper"} style={{height: "100vh"}} justify={"space-between"}>

        <ConfigProvider theme={{
          components: {
            Button : {
              borderRadius : 0,
              colorTextDisabled: "#ababab",
              colorBgContainerDisabled : "#0f3e7e",
              colorBorder : "rgba(7,28,59,0)",
              colorBgContainer: 'var(--select-container-color)'
            },
            Input: {
              fontSize: 18,
              borderRadius: 0,
              colorBgContainer: 'var(--select-container-color)'
            },
            Select: {
              borderRadius: 0,
              height: 50,
              controlHeight: 41,
              colorBgContainer: 'var(--select-container-color)'
            }
          }
        }}>

          <Flex vertical style={{width: "100%"}}>

            <Flex style={{backgroundColor: "#070f25", paddingBottom: 5, paddingLeft: 20}} gap={1}>
              <ImportData/>
              <ExportData/>
              <AboutModal/>
            </Flex>
            <Flex style={{padding: 20, marginTop: 50, maxWidth: 900}}>
              <ManageBar messages={messages}
                         setMessages={setMessages}
                         subscriptionListRef={subscriptionListRef}
                         subscriptions={subscriptions}
                         setSubscriptions={setSubscriptions}
              />
            </Flex>
          </Flex>
        </ConfigProvider>

        <LogsList messages={messages}
                  setMessages={setMessages}
        />
      </Flex>
  );
}

export default App;
