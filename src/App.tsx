import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import ManageBar from "./components/ManageBar/ManageBar.tsx";
import {ConfigProvider, Flex} from "antd";
import {Subscription} from "./types/Subscription.ts";
import {ILogItem} from "./components/LogItem/LogItem.tsx";
import LogsList from "./components/LogsList/LogsList.tsx";
import AppOptions from "./components/AppOptions/AppOptions.tsx";
import {THEMES} from "./components/AppOptions/ThemesOption/ThemesOption.tsx";


type ThemeData = {
  colorPrimary: string;
  token : {}
  components : {}
  button : {}
};

export let ANT_DESIGN_THEME : ThemeData = {
  colorPrimary : "#1677ff",
  token: {
    // colorPrimary: "#1677ff",
  },
  button: {
    // colorPrimary: "#1677ff",
  },
  components: {

    Button: {
      // colorPrimaryHover : "var(--color-primary-hover)",
      // colorPrimaryTextHover : "var(--color-primary-hover)",
      // colorPrimaryActive : "var(--color-primary-active)",
      borderRadius: 0,
      colorTextDisabled: "var(--text-color-disabled)",
      colorBgContainerDisabled: "var(--button-bg-disabled)",
      colorBorder: "rgba(7,28,59,0)",
      primaryColor : "var(--primary-color)",
      // colorBgContainer: 'var(--input-bg-color)'
    },
    Segmented: {
      colorText: "var(--input-text-color)",
      itemSelectedBg: "var(--segment-selected-bg)",
      trackBg: "var(--input-bg-color)"
    },
    Input: {
      colorText: "var(--input-text-color)",
      fontSize: 18,
      colorTextDisabled: "var(--text-color-disabled)",
      colorBorder: "rgba(7,28,59,0)",
      colorBgContainerDisabled: "var(--disabled-bg-color)",
      borderRadius: 0,
      colorBgContainer: 'var(--input-bg-color)'
    },
    Select: {
      colorBgContainerDisabled: "var(--disabled-bg-color)",
      colorBorder: "rgba(7,28,59,0)",
      borderRadius: 0,
      height: 50,
      controlHeight: 41,
      colorBgContainer: 'var(--input-bg-color)'
    },
    Modal : {
      contentBg : "var(--modal-bg)"
    }
  }
}



function App() {
  const [messages, setMessages] = useState<ILogItem[]>([]);
  const subscriptionListRef = useRef<HTMLUListElement | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [themeData, setThemeData] = useState<ThemeData>(ANT_DESIGN_THEME)
  const [theme, setTheme] = useState(THEMES.LIGHT_THEME);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  useEffect(() => {
    // const rootStyles = getComputedStyle(document.documentElement);
    // If the variable is still empty, set it manually
    // const colorPrimary = "--color-primary"
      if (theme === THEMES.LIGHT_THEME) {
        // document.documentElement.style.setProperty(colorPrimary, "#26ff16"); // Default hover color
        // color ="#26ff16"
        themeData.colorPrimary = "#494949"

      }
      if (theme === THEMES.DARK_BLUE_THEME) {
        themeData.colorPrimary = "#1677ff"
        // document.documentElement.style.setProperty(colorPrimary, "#1677ff"); // Default hover color
        // color ="#1677ff"
      }
      console.log("new colorPrimary", themeData.colorPrimary)
      setThemeData({...themeData})
  }, [theme]);


  return (
      <Flex className={"mainWrapper"} style={{height: "100vh"}} justify={"space-between"}>

        <ConfigProvider theme={{
          token: {
            colorPrimary : themeData.colorPrimary,
            // ...themeData.token
          },
          components : {
            Button : {
              colorPrimary : themeData.colorPrimary,
              // ...themeData.button
            },
            ...themeData.components
          }
        }}>

          <Flex vertical style={{width: "100%"}}>

            <Flex style={{backgroundColor: "var(--disabled-bg-color)", paddingBottom: 5, paddingLeft: 20}} gap={1}>
              <AppOptions setTheme={setTheme} />
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
