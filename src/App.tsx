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
              colorBgContainer: 'var(--input-bg-color)'
            },
            Segmented : {
              colorText : "var(--input-text-color)",
              itemSelectedBg : "rgb(11,23,54)",
              trackBg : "var(--input-bg-color)"
            },
            Input: {
              colorText : "var(--input-text-color)",
              fontSize: 18,
              colorTextDisabled: "#ababab",
              colorBorder : "rgba(7,28,59,0)",
              colorBgContainerDisabled : "var(--disabled-bg-color)",
              borderRadius: 0,
              colorBgContainer: 'var(--input-bg-color)'
            },
            Select: {

              colorBgContainerDisabled : "var(--disabled-bg-color)",
              colorBorder : "rgba(7,28,59,0)",
              borderRadius: 0,
              height: 50,
              controlHeight: 41,
              colorBgContainer: 'var(--input-bg-color)'
            }
          }
        }}>

          <Flex vertical style={{width: "100%"}}>

            <Flex style={{backgroundColor: "var(--disabled-bg-color)", paddingBottom: 5, paddingLeft: 20}} gap={1}>
              <ConfigProvider theme={{
                    components: {
                      Button : {
                        colorBgContainer: '#153e79',
                        colorText : "#b1c5e1"
                      }}
              }}>
                <ImportData/>
                <ExportData/>
                <AboutModal/>
              </ConfigProvider>
            </Flex>
            <Flex style={{padding: 15, marginTop: 50}}>
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
