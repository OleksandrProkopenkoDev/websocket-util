import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import {Flex, notification} from "antd";
// import Stomp, {Client} from "stompjs";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Subscription} from "../../types/Subscription.ts";
import JsonEditorComponent from "../JsonEditorComponent.tsx";
import {
  getAllSubscriptions,
  removeSubscriptionItem,
} from "../../api/SubscriptionService.ts";
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
import TokenInput from "../TokenInput/TokenInput.tsx";
import {TokenListItem} from "../../api/TokenService.ts";

interface ManageBarProps {
  messages: ILogItem[]
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
  const [handshakeUrl, setHandshakeUrl] = useState("http://localhost:8080/")
  const [token, setToken] = useState<TokenListItem>(null)
  const [endpoint, setEndpoint] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isConnection, setIsConnection] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [client, setClient] = useState<Client>()
  const [subscriptionList, setSubscriptionList] = useState<string[]>([])
  const [destinationsList, setDestinationsList] = useState<DestinationListItem[]>([])
  const [selectedDestination, setSelectedDestination] = useState<DestinationListItem>()
  const [jsonInput, setJsonInput] = useState<string>('');

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

      const socket = new SockJS(handshakeUrl, null, {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling']  // Exclude 'jsonp-polling'
      });

      var client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          'Authorization': `Bearer ${token.token}`
        },
        onWebSocketClose: (msg) => {
          console.log("on close", msg)
          notification.warning({
            message: "WebSocket Closed",
            description: msg.reason,
          });
        },
        onWebSocketError : (err) => {
          console.log("on error", err)
        },
        debug: (str) => {
          console.log(str);
          if (str.includes("Connection closed")) {
            console.error("Connection closed")
            setStatus('Disconnected 🔴')
            setIsConnected(false);
            setIsConnection(false);
          }
        },
        onStompError : (frame) => {
          console.error('Broker reported error:', frame.headers['message']);
          console.error('Additional details:', frame.body);

          setIsConnected(false);
          setIsConnection(false);

          notification.error({
            message: "WebSocket Error",
            description: frame.headers['message'] || "An unexpected error occurred.",
          });
        },

        reconnectDelay: 5000,  // Reconnect if the connection drops
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      setIsConnection(true);
      client.onConnect = (frame) => {
        console.log('Connected:', frame);
        setClient(client)
        setStatus('Connected 🟢');
        setIsConnected(true);
        setIsConnection(false);
      };

      client.onDisconnect = (error) => {
        console.error('Disconnected 🔴:', error);
        setIsConnected(false);
        setIsConnection(false);
        notification.error({ message: "Disconnected from WebSocket" });
      };

      client.activate();

    } else {
      setIsConnected(false)
      setStatus('Disconnected 🔴')

    }
    return () => {
      if (client) {
        client.forceDisconnect()
      }
    };
  }

  const onSendMessage = () => {
    saveDestinationIfNotSaved(destination)
    client?.publish({
      destination: destination,
      body: jsonInput
    });
    logEvent("Sent message -" + destination, jsonInput, LogType.SEND)
  };

  /**
   * display log message to custom console panel
   * @param message
   * @param json
   * @param logType type of log message
   */
  const logEvent = (message: string, json: string, logType?: LogType) => {
    let logItem: ILogItem = {message: message, json: json, type: logType}
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
      <Flex gap={5} vertical style={{width: "100%"}}>

        <Flex style={{flexBasis: "50%"}}
              vertical
              gap={10}
        >
          <Flex style={{fontSize: 20}}
                vertical
                className={"pt-sans-regular"}
                gap={5}

          >


            <Flex gap={10} vertical>
              <ConnectBtn onConnect={onConnect}
                          isConnected={isConnected}
                          isConnection={isConnection}
                          status={status}
                          client={client}
              />
              <Flex gap={10} style={{flexWrap: "wrap"}}>
                <HandshakeInput handshakeUrl={handshakeUrl}
                                isConnected={isConnected}
                                setHandshakeUrl={setHandshakeUrl}
                />
                <TokenInput token={token}
                            handshakeUrl={handshakeUrl}
                            isConnected={isConnected}
                            setToken={setToken}
                />
              </Flex>
            </Flex>


          </Flex>

          <Flex gap={10} vertical style={{maxWidth: 700}}>
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
            <SubscriptionList OnUnsubscribe={OnUnsubscribe} subscriptions={subscriptions}/>
          </Flex>
        </Flex>

        <Flex vertical
              style={{flexBasis: "50%", padding: "10px 15px"}}
              gap={5}
        >
          <DestinationInput destination={destination}
                            setDestination={setDestination}
                            destinationsList={destinationsList}
                            setSelectedDestination={setSelectedDestination}
                            onSendMessage={onSendMessage}
                            isConnected={isConnected}
          />
          <JsonEditorComponent onSendMessage={onSendMessage}
                               isConnected={isConnected}
                               selectedDestination={selectedDestination as DestinationListItem}
                               jsonData={jsonInput}
                               setSelectedDestination={setSelectedDestination}
                               setJsonData={setJsonInput}
          />
        </Flex>

      </Flex>
  );
};

export default ManageBar;