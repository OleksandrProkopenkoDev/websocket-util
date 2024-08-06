import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './App.css'; // Import the CSS styles

// Define the shape of the JSON message
interface GroupMessageRequestDto {
  countryId: number;
  senderId: number;
  content: string;
}

function App() {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [status, setStatus] = useState<string>('Disconnected');
  const [endpoint, setEndpoint] = useState<string>('/countries/Angola/messages');
  const [destination, setDestination] = useState<string>('/chat/group-messages');
  const [jsonInput, setJsonInput] = useState<string>(
      JSON.stringify(
          {
            countryId: 5,
            senderId: 1,
            content: 'Hello angola'
          },
          null,
          2
      )
  );
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [messages, setMessages] = useState<string>('');

  const messagesRef = useRef<HTMLTextAreaElement | null>(null);
  const subscriptionListRef = useRef<HTMLUListElement | null>(null);

  const connect = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket as WebSocket);
    setStompClient(client);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setStatus('Connected');
    });

    return () => {
      client.disconnect(() => console.log('Disconnected'));
    };
  }

  const subscribe = () => {
    if (stompClient) {
      stompClient.connect({}, () => {
        stompClient.subscribe(endpoint, (message) => {
          setMessages((prevMessages) => prevMessages + `Received: ${message.body}\n`);
        });
        if (!subscriptions.includes(endpoint)) {
          setSubscriptions((prevSubscriptions) => [...prevSubscriptions, endpoint]);
        }
      });
    }
  };

  const sendMessage = () => {
    if (stompClient) {
      try {
        const parsedMessage: GroupMessageRequestDto = JSON.parse(jsonInput);
        stompClient.send(destination, {}, JSON.stringify(parsedMessage));
        setMessages((prevMessages) => prevMessages + `Sent: ${JSON.stringify(parsedMessage)}\n`);
      } catch (e) {
        alert('Invalid JSON format. Please correct it and try again.');
      }
    }
  };

  useEffect(() => {
    if (subscriptionListRef.current) {
      if ("innerHTML" in subscriptionListRef.current) {
        subscriptionListRef.current.innerHTML = subscriptions
        .map((sub) => `<li>${sub}</li>`)
        .join('');
      }
    }
  }, [subscriptions]);

  return (
      <div>
        <h1>WebSocket Test</h1>
        <div className="container">
          <div>
            <div>
              <label htmlFor="status">Status: </label>
              <span id="status">{status}</span>
            </div>

            <div>
              <label htmlFor="endpoint">Subscribe to Endpoint: </label>
              <input
                  type="text"
                  id="endpoint"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
              />
              <button onClick={subscribe}>Subscribe</button>
            </div>

            <div>
              <label htmlFor="destination">Destination: </label>
              <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="json-input-container">
              <label htmlFor="jsonInput">Message JSON:</label>
              <textarea
                  id="jsonInput"
                  rows={10}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
              />
              <div className="button-container">
                <button onClick={sendMessage}>Send Message</button>
              </div>
            </div>
          </div>
          <div className="subscription-list-container">
            <label>Subscriptions:</label>
            <ul id="subscriptionList" className="subscription-list" ref={subscriptionListRef}></ul>
          </div>
        </div>
        <div>
          <textarea id="messages" readOnly value={messages} ref={messagesRef}></textarea>
        </div>
      </div>
  );
}

export default App;
