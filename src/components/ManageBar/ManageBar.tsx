import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import {Flex, notification} from "antd";
import Stomp, {Client} from "stompjs";
import SockJS from 'sockjs-client';
import {Subscription} from "../../types/Subscription.ts";
import JsonEditorComponent from "../JsonEditorComponent.tsx";
import {getAllSubscriptions, removeSubscriptionItem} from "../../api/SubscriptionService.ts";
import SubscriptionList from "../SubscriptionList/SubscriptionList.tsx";
import {
  DestinationListItem,
  getAllDestinationsItems,
  saveDestinationIfNotSaved
} from "../../api/DestinationService.ts";
import {ILogItem, LogType} from "../LogItem/LogItem.tsx";
import HandshakeInput from "../HandshakeInput/HandshakeInput.tsx";
import {saveHandshakeUrlIfNotSaved} from "../../api/HandshakeUrlService.ts";
import DestinationInput from "../DestinationInput/DestinationInput.tsx";
import SubscribeInput from "../SubscribeInput/SubscribeInput.tsx";
import ConnectBtn from "../ConnectBtn/ConnectBtn.tsx";

interface ManageBarProps {
  messages : ILogItem[]
  subscriptions: Subscription[]
  setMessages: (value: (((prevState: ILogItem[]) => ILogItem[]) | ILogItem[])) => void
  subscriptionListRef: MutableRefObject<HTMLUListElement | null>
  setSubscriptions: (value: (((prevState: Subscription[]) => Subscription[]) | Subscription[])) => void
}


const ManageBar: FC<ManageBarProps> = ({
                                         subscriptions,
                                         setSubscriptions, messages, setMessages
                                       }) => {
  const [status, setStatus] = useState<string>('Disconnected 🔴');
  const [handshakeUrl, setHandshakeUrl] = useState("http://localhost:8080/ws")
  const [endpoint, setEndpoint] = useState<string>('');
  const [destination, setDestination] = useState<string>('/chat/group-messages');
  const [isConnection, setIsConnection] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [client, setClient] = useState<Client>()
  const [subscriptionList, setSubscriptionList] = useState<string[]>([])
  const [destinationsList, setDestinationsList] = useState<DestinationListItem[]>([])
  const [selectedDestination, setSelectedDestination] = useState<DestinationListItem>()
  const [jsonInput, setJsonInput] = useState(JSON.stringify(
          {
            countryId: 5,
            senderId: 1,
            content: 'Hello angola'
          })
  );

  useEffect(() => {
    setSubscriptionList(getAllSubscriptions())
  }, [localStorage.getItem("subscriptions")]);

  useEffect(() => {
    setDestinationsList(getAllDestinationsItems())
  }, [localStorage.getItem("destinations")]);

  useEffect(() => {
    let list = getAllSubscriptions();
    setSubscriptionList(list)
    if (list[0]) {
      setEndpoint(list[0])
    }
  }, []);

  useEffect(() => {
    let list = getAllDestinationsItems();
    setDestinationsList(list)
    if (list[0]) {
      setDestination(list[0].destination)
      setSelectedDestination(list[0])
    }
  }, []);

  const onConnect = () => {
    saveHandshakeUrlIfNotSaved(handshakeUrl)
    if (!isConnected) {
      const socket = new SockJS(handshakeUrl);
      let client = Stomp.over(socket as WebSocket);
      setIsConnection(true)
      client.connect({}, (frame) => {
        setStatus('Connected 🟢');
        setIsConnection(false)
        setIsConnected(true)
        setClient(client)
      }, error => {
        setIsConnected(false)
        setIsConnection(false)
        notification.error({message: "Can't connect to WS"})
      });

    } else {
      setIsConnected(false)
      setStatus('Disconnected 🔴')
      if (client ) {
        client.disconnect(() => {
          console.log('Disconnected 🔴')
        })
      }
    }
    return () => {
      if (client ) {
        client.disconnect(() => console.log('Disconnected 🔴'));
      }
    };
  }

  const onSendMessage = () => {
    saveDestinationIfNotSaved(destination)
    client?.send(destination, {}, jsonInput);
    logEvent("Sent message -" + destination, jsonInput, LogType.SEND)
  };

  /**
   * display log message to custom console panel
   * @param message
   * @param json
   * @param logType type of log message
   */
  const logEvent = (message : string, json : string, logType? : LogType) => {
    let logItem : ILogItem = {message: message, json: json, type: logType}
    setMessages((prevState) => [...prevState, logItem])
  }

  const onRemoveSubscriptionItem = (destination: string) => {
    setSubscriptionList(subscriptionList.filter((e) => e !== destination))
    removeSubscriptionItem(destination)
  }

  const OnUnsubscribe = (subscription: Subscription) => {
    subscription.subscription.unsubscribe()
    setSubscriptions(subscriptions.filter((e) => e.destination !== subscription.destination))
  }

  return (
      <Flex gap={5} style={{width: "100%"}}>
        <Flex vertical
              style={{flexBasis: "50%", padding: "10px 15px"}}
              gap={5}
        >
          <DestinationInput destination={destination}
                            setDestination={setDestination}
                            destinationsList={destinationsList}
                            setSelectedDestination={setSelectedDestination}
          />
          <JsonEditorComponent onSendMessage={onSendMessage}
                               isConnected={isConnected}
                               selectedDestination={selectedDestination as DestinationListItem}
                               jsonData={jsonInput}
                               setSelectedDestination={setSelectedDestination}
                               setJsonData={setJsonInput}
          />
        </Flex>
        <Flex style={{flexBasis: "50%"}}
              vertical
              gap={10}
        >
          <Flex style={{fontSize: 20}}
                vertical
                className={"pt-sans-regular"}
                gap={5}
               
          >
            <HandshakeInput handshakeUrl={handshakeUrl}
                            isConnected={isConnected}
                            setHandshakeUrl={setHandshakeUrl}
            />
            <ConnectBtn onConnect={onConnect}
                        isConnected={isConnected}
                        isConnection={isConnection}
                        status={status}
                        client={client}
            />

          <SubscribeInput isConnected={isConnected}
                          logEvent={logEvent}
                          client={client}
                          setSubscriptions={setSubscriptions}
                          onRemoveSubscriptionItem={onRemoveSubscriptionItem}
                          setEndpoint={setEndpoint}
                          subscriptionList={subscriptionList}
                          endpoint={endpoint}
                          subscriptions={subscriptions}
          />
          </Flex>
          <SubscriptionList OnUnsubscribe={OnUnsubscribe} subscriptions={subscriptions}/>
        </Flex>
      </Flex>
  );
};

export default ManageBar;