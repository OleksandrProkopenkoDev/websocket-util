import React, {FC, useEffect, useState} from 'react';
import {
  Button,
  Dropdown,
  DropdownProps,
  Empty,
  Flex,
  Input,
  MenuProps,
  notification,
  Select
} from "antd";
import {CloseOutlined, DownOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {Subscription} from "../../types/Subscription.ts";
import {saveSubscriptionIfNotSaved} from "../../api/SubscriptionService.ts";
import {LogType} from "../LogItem/LogItem.tsx";
import {Client} from "stompjs";
import SubscriptionMenuItem from "./SubscriptionMenuItem.tsx";
import classes from './SubscribeInput.module.css'
import {StompSubscription} from "@stomp/stompjs";

interface SubscribeInputProps {
  isConnected: boolean
  onRemoveSubscriptionItem: (destination: string) => void
  setEndpoint: (value: (((prevState: string) => string) | string)) => void
  subscriptionList: string[]
  subscriptionEndpoint: string
  setSubscriptions: (value: (((prevState: Subscription[]) => Subscription[]) | Subscription[])) => void
  subscriptions: Subscription[]
  client?: Client
  logEvent: (message: string, json: string, logType?: LogType) => void
  subscribe : (endpoint : string) => StompSubscription
}

// interface MenuSubscription {
//   subscriptionEndpoint : string
//   isAddedToSubscriptionList : boolean
// }

const SubscribeInput: FC<SubscribeInputProps> = ({
                                                   setEndpoint,
                                                   isConnected,
                                                   onRemoveSubscriptionItem,
                                                   subscriptionList,
                                                   subscriptionEndpoint,
                                                   subscriptions,
                                                   setSubscriptions,
                                                   client,
                                                   logEvent,
                                                   subscribe
                                                 }) => {
  const [isSubscribeButtonDisabled, setIsSubscribeButtonDisabled] = useState<boolean>(false);

  /**
   * if already subscribed - disable subscribe button
   */
  useEffect(() => {
    if (subscriptions.find((e) => e.destination === subscriptionEndpoint) === undefined) {
      setIsSubscribeButtonDisabled(false)
    } else setIsSubscribeButtonDisabled(true)
  }, [subscriptions, subscriptionEndpoint]);


  const onSubscribeBtnClick = () => {
    console.log("onSubscribeBtnClick")
    saveSubscriptionIfNotSaved(subscriptionEndpoint)
    onSubscribeToEndpoint(subscriptionEndpoint)
  };

  const onSubscribeToEndpoint = (subscriptionEndpoint: string) => {
    console.log("onSubscribeToEndpoint")
    if (!isConnected) {
      const newSubscription: Subscription = {
        destination: subscriptionEndpoint,
        isSubscribed: false
      }
      console.log("not connected, add subscription item without stomp subscription", newSubscription)
      setSubscriptions([...subscriptions, newSubscription])
      return;
    }
    if (!subscriptions.find((e) => e.destination === subscriptionEndpoint)) {
      let subscription = subscribe(subscriptionEndpoint);
      const newSubscription: Subscription = {
        subscription: subscription,
        destination: subscriptionEndpoint,
        isSubscribed: true
      }
      console.log("add subscription", newSubscription)
      setSubscriptions([...subscriptions, newSubscription])
    } else {
      notification.info({message: "already subscribed!"})
    }
  }

  const [isSubscriptionMenuOpen, setIsSubscriptionMenuOpen] = useState<boolean>(false)

  const onSelectClick = () => {
    setIsSubscriptionMenuOpen(!isSubscriptionMenuOpen)
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEndpoint(e.target.value)
      if (isConnected) {
        onSubscribeBtnClick()
      }
    }
  }

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    console.log("handleOpenChange")
    if (info.source === 'trigger' || nextOpen) {
      setIsSubscriptionMenuOpen(nextOpen);
    }
  };

  const items: MenuProps['items'] = subscriptionList.map((item) => {
    const disabled = subscriptions.find((e) => e.destination === item) !== undefined
    return {
      key: "subscribe-" + item,
      disabled: disabled,
      label: (
          <SubscriptionMenuItem item={item}
                                disabled={disabled}
                                onRemoveSubscriptionItem={onRemoveSubscriptionItem}
                                subscriptions={subscriptions}
                                onSubscribeToEndpoint={onSubscribeToEndpoint}
          />
      ),
    }
  });

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      setIsSubscriptionMenuOpen(false);
    }
  };

  return (
      <Flex vertical  style={{width: "100%"}}>
        <label className={"text"} style={{fontSize: 20}} htmlFor="endpoint">Subscribe to:</label>
        <Flex style={{width: "100%"}}>
          <Dropdown
              dropdownRender={(node) => {
                return <>
                {subscriptionList.length === 0 ? <Flex style={{backgroundColor: "white", padding: 5, borderRadius: 10}}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No saved subscriptions. Type new endpoint in input above and click 'Add' button."}/>
                </Flex> : node}
                </>
              }}
              open={isSubscriptionMenuOpen}
              onOpenChange={handleOpenChange}
              overlayClassName={classes.dropdownWrapper}
              menu={{items, onClick : handleMenuClick}}
          >
            <Button style={{marginTop: 0, height: 43, width: 43}} icon={<DownOutlined style={{color: "var(--input-text-color)"}} />}/>
          </Dropdown>
          <div style={{width: 1, height: 43, backgroundColor: "black"}}></div>
          <Input style={{fontSize: 20}} className={"pt-sans-regular"}
                 allowClear
                 type="text"
                 id="endpoint"
                 value={subscriptionEndpoint}
                 onKeyDown={onInputKeyDown}
                 onChange={(e) => setEndpoint(e.target.value)}
          />
          <Button type={"primary"}
                  style={{marginTop: 0, height: "inherit"}}
                  disabled={isSubscribeButtonDisabled}
                  onClick={onSubscribeBtnClick}>{isConnected ? "Subscribe" : "Add"}</Button>
        </Flex>
      </Flex>
  );
};

export default SubscribeInput;