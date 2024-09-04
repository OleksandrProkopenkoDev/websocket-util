import React, {FC} from 'react';
import {Button, Flex, List} from "antd";
import {Subscription} from "../../types/Subscription.ts";
import {CloseOutlined} from "@ant-design/icons";

interface SubscriptionListProps {
  subscriptions: Subscription[]
  OnUnsubscribe: (subscription: Subscription) => void

}

const SubscriptionList: FC<SubscriptionListProps> = ({subscriptions, OnUnsubscribe}) => {
  return (
      <div style={{overflowY : "scroll", maxHeight: 100, border: "#f2f2f2 solid 1px"}}>
        <List
            dataSource={subscriptions}
            renderItem={(item) => (
                <List.Item style={{padding: 2, margin: 1, fontSize: 20}}
                           className={"pt-sans-regular"}>

                  <Flex gap={10} justify={"space-between"}
                        style={{width: "100%", padding: "0 5px"}}>
                    <span>{item.destination}</span>
                    <Button onClick={() => OnUnsubscribe(item)} danger title={"unsubscribe"}
                            icon={<CloseOutlined/>}/>
                  </Flex>
                </List.Item>
            )}
        />
      </div>
  );
};

export default SubscriptionList;