import React, {FC, useEffect, useState} from 'react';
import {Button, ConfigProvider, Empty, Flex, List} from "antd";
import {Subscription} from "../../types/Subscription.ts";
import {CloseOutlined, LoginOutlined, PauseCircleOutlined, StopOutlined} from "@ant-design/icons";

interface SubscriptionListProps {
  subscriptions: Subscription[]
  OnUnsubscribe: (subscription: Subscription) => void
  pauseSubscribe: (subscription: Subscription) => void
  startSubscribe: (subscription: Subscription) => void
}

const SubscriptionList: FC<SubscriptionListProps> = ({
                                                       subscriptions,
                                                       OnUnsubscribe,
                                                       pauseSubscribe,
                                                       startSubscribe
                                                     }) => {

  const onStopStartSubscriptionBtnClick = (item: Subscription) => {
    if (item.isSubscribed) {
      pauseSubscribe(item)
    } else {
      startSubscribe(item)
    }
  }

  return (
      <div className={"SubscriptionList"} style={{
        overflowY: "scroll",
        height: "100%",
        maxHeight: 330,
        border: "solid 3px",
        borderRadius: 10,
        borderColor: "#0e2257",
        scrollbarWidth: "thin",
      }}>
        <ConfigProvider renderEmpty={() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                  description={<span style={{color: "var(--input-text-color)"}}>No subscriptions</span>}/>}>
          <List
              dataSource={subscriptions}
              renderItem={(item) => (
                  <List.Item style={{
                    padding: 2,
                    margin: 1,
                    fontSize: 20,
                    backgroundColor: item.isSubscribed ? "rgba(22,197,12,0.54)" : "rgba(253,77,79,0.49)"
                  }}
                             className={"pt-sans-regular"}>

                    <Flex gap={10} justify={"space-between"}
                          style={{width: "100%", padding: "0 5px"}}>
                      <span className={"text"}>{item.destination}</span>
                      <Flex gap={5}>
                        <Button onClick={() => OnUnsubscribe(item)}
                                type={"primary"}
                                style={{marginTop: 0}}
                                danger
                                title={"Unsubscribe and remove from this list"}
                                icon={<CloseOutlined/>}/>

                        <Button onClick={() => onStopStartSubscriptionBtnClick(item)}
                                style={{marginTop: 0}}
                                type={"primary"}
                                danger={item.isSubscribed}
                                title={"Unsubscribe"}
                                icon={item.isSubscribed ? <StopOutlined/> : <LoginOutlined/>}
                        />
                      </Flex>
                    </Flex>
                  </List.Item>
              )}
          />
        </ConfigProvider>
      </div>
  );
};

export default SubscriptionList;