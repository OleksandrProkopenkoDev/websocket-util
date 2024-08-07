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
      <div className="subscription-list-container">
        <label style={{fontSize: 20, fontWeight: "bold"}}
               className={"pt-sans-regular"}>Subscriptions:</label>
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