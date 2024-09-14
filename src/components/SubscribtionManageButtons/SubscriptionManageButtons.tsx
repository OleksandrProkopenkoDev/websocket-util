import React, {FC} from 'react';
import {Subscription} from "../../types/Subscription.ts";
import {Client} from "stompjs";
import {Button, Flex} from "antd";

interface SubscriptionManageButtonsProps {
  isConnected: boolean
  onRemoveSubscriptionItem: (destination: string) => void
  subscriptionList: string[]
  setSubscriptions: (value: (((prevState: Subscription[]) => Subscription[]) | Subscription[])) => void
  subscriptions: Subscription[]
  client?: Client
}

const SubscriptionManageButtons: FC<SubscriptionManageButtonsProps> = ({
                                                                         subscriptions,
                                                                         setSubscriptions,
                                                                         subscriptionList,
                                                                         onRemoveSubscriptionItem,
                                                                         isConnected,
                                                                         client
                                                                       }) => {

  const onRemoveAll = () => {

    subscriptions.forEach((subscription) => {
      if (subscription.subscription) {
        subscription.subscription.unsubscribe()
      }
    })
    setSubscriptions([])
  }

  const hasInactiveSubscriptions = () => {
    return subscriptions.filter((s) => !s.isSubscribed).length > 0
  }

  return (
      <Flex gap={5}>
        {/*<Button disabled={!hasInactiveSubscriptions() || !isConnected} type={"primary"}>Subscribe all</Button>*/}
        <Button type={"primary"} disabled={subscriptions.length == 0} onClick={onRemoveAll} danger>Remove all</Button>

      </Flex>
  );
};

export default SubscriptionManageButtons;