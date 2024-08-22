import React, {FC, useEffect, useState} from 'react';
import {Button, Flex, Input, notification, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {Subscription} from "../../types/Subscription.ts";
import {saveSubscriptionIfNotSaved} from "../../api/SubscriptionService.ts";
import {LogType} from "../LogItem/LogItem.tsx";
import {Client} from "stompjs";

interface SubscribeInputProps {
  isConnected: boolean
  onRemoveSubscriptionItem: (destination: string) => void
  setEndpoint: (value: (((prevState: string) => string) | string)) => void
  subscriptionList: string[]
  endpoint: string
  setSubscriptions: (value: (((prevState: Subscription[]) => Subscription[]) | Subscription[])) => void
  subscriptions: Subscription[]
  client?: Client
  logEvent: (message: string, json: string, logType?: LogType) => void
}

const SubscribeInput: FC<SubscribeInputProps> = ({
                                                   setEndpoint,
                                                   isConnected,
                                                   onRemoveSubscriptionItem,
                                                   subscriptionList,
                                                   endpoint,
                                                   subscriptions,
                                                   setSubscriptions,
                                                   client,
                                                   logEvent
                                                 }) => {
  const [isSubscribeButtonDisabled, setIsSubscribeButtonDisabled] = useState<boolean>(false);

  /**
   * if already subscribed - disable subscribe button
   */
  useEffect(() => {
    if (subscriptions.find((e) => e.destination === endpoint) === undefined) {
      setIsSubscribeButtonDisabled(false)
    } else setIsSubscribeButtonDisabled(true)
  }, [subscriptions, endpoint]);

  /**
   * subscribe to path
   * log to console
   * @constructor
   */
  const OnSubscribe = () => {
    saveSubscriptionIfNotSaved(endpoint)

    if (!subscriptions.find((e) => e.destination === endpoint)) {
      let subscription = client?.subscribe(endpoint, (message) => {
        logEvent("ReceiveMessage -" + endpoint, message.body.toString(), LogType.RECEIVE)
      });

      if (subscription !== undefined) {
        setSubscriptions([...subscriptions, {subscription: subscription, destination: endpoint}])
      }
    } else {
      notification.info({message: "already subscribed!"})
    }
  };

  return (
      <Flex vertical  style={{width: "100%"}}>
        <label htmlFor="endpoint">Subscribe to:</label>
        <Flex style={{width: "100%"}}>
          <Select
              optionRender={(option) => {
                return <Flex gap={5} align={"center"} justify={"space-between"}>
                  <span className={"pt-sans-regula"} style={{fontSize: 18}}>{option.label}</span>
                  <Button danger onClick={() => onRemoveSubscriptionItem(option.value as string)}
                          icon={<CloseOutlined/>}/>
                </Flex>;
              }}
              value={""}
              onSelect={(value) => {
                setEndpoint(value)
              }}
              optionFilterProp="label"
              dropdownStyle={{width: 500}}
              options={subscriptionList.map((item) => ({
                value: item,
                label: item,
              }))}
          />
          <Input style={{fontSize: 20}} className={"pt-sans-regular"}
                 type="text"
                 id="endpoint"
                 value={endpoint}
                 onChange={(e) => setEndpoint(e.target.value)}
          />
          <Button type={"primary"}
                  style={{marginLeft: 10}}
                  disabled={!isConnected || isSubscribeButtonDisabled}
                  onClick={OnSubscribe}>Subscribe</Button>
        </Flex>
      </Flex>
  );
};

export default SubscribeInput;