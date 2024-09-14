import React, {FC} from 'react';
import {Button, ConfigProvider, Flex} from "antd";
import {CloseOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {Subscription} from "../../types/Subscription.ts";

interface SubscriptionMenuItemProps {
  disabled : boolean
  item : string
  onRemoveSubscriptionItem : (subscription: string) => void
  subscriptions: Subscription[]
  onSubscribeToEndpoint : (subscriptionEndpoint : string) => void
}

const SubscriptionMenuItem:FC<SubscriptionMenuItemProps> = ({item, onRemoveSubscriptionItem, subscriptions, onSubscribeToEndpoint, disabled}) => {

  return (
      <ConfigProvider theme={{
            components: {
              Button : {
                colorBgContainerDisabled : "var(--input-bg-color)",
              }}
      }}>


      <Flex gap={5}
            align={"center"}
            justify={"space-between"}
      >
        <Flex gap={5} align={"center"}>
          <Button disabled={disabled} title={"Add subscription"}
                  type={"primary"}
                  onClick={() => onSubscribeToEndpoint(item)}
                  icon={<PlusCircleOutlined/>}
          />
          <span className={"pt-sans-regula"}
                style={{fontSize: 18, whiteSpace: "initial"}}>{item}</span>
        </Flex>
        <Button danger
                type={"primary"}
                onClick={() => onRemoveSubscriptionItem(item)}
                icon={<CloseOutlined/>}
        />
      </Flex>
      </ConfigProvider>
  );
};

export default SubscriptionMenuItem;