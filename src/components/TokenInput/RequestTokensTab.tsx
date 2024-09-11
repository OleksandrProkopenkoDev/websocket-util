import React, {FC, useState} from 'react';
import TokensList from "./TokensList.tsx";
import {Button, Divider, Flex, Input, Space} from "antd";
import {CheckOutlined, CloseCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {LoginRequest, LoginResponse, TokenListItem} from "../../api/TokenService.ts";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

interface RequestTokensTabProps {
  handshakeUrl : string
  tokens : TokenListItem[]
  onRemove : (label: string) => void
  addToken : (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const getApiUrlFromProvidedHandshakeUrl = (handshakeUrl? : string) => {
  if (!handshakeUrl) return;
  const serverUrlIndex = handshakeUrl.lastIndexOf(":")
  const serverUrlPar1 = handshakeUrl.substring(0, serverUrlIndex)
  const serverUrlPar2 = handshakeUrl.substring(serverUrlIndex, serverUrlPar1.length + 5)
  return serverUrlPar1 + serverUrlPar2 + "/api/authentication/login";
}


const RequestTokensTab:FC<RequestTokensTabProps> = ({tokens, onRemove, addToken, handshakeUrl}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [label, setLabel] = useState('');
  const [serverApiUrl, setServerApiUrl] = useState(getApiUrlFromProvidedHandshakeUrl(handshakeUrl))
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRequestSuccessful, setIsRequestSuccessful] = useState<boolean | null>(null)
  const [response, setResponse] = useState<LoginResponse>(null);


  const onVerifyCredentials = async () => {
    const requestBody : LoginRequest  = {
      userEmail : email,
      password : password
    };

    setIsLoading(true)
    fetch(serverApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // Convert JavaScript object to JSON
    })
    .then(response => {
      setIsLoading(false)
      if (response.status != '200') {
        setIsRequestSuccessful(false)
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data != null) {
        setIsLoading(false)
        setIsRequestSuccessful(true)
        setResponse(data); // Save the response data in the state
      }
    })
    .catch(error => {
      setIsRequestSuccessful(false)
      setIsLoading(false)
      console.error('Error:', error);
    });
  }

  return (
      <>
        <TokensList tokens={tokens} onRemove={onRemove}/>

        <Divider orientation={"left"} style={{margin: '8px 0'}}>Add new request</Divider>
        <Flex vertical   style={{padding: '0 8px 4px', fontSize: 18, width: "100%"}}
               className={"pt-sans-regular"}>

          <Flex style={{width: "100%"}}>
            <Flex gap={20} align={"start"} style={{width: "100%"}}>
              <Flex vertical style={{width: "100%"}} gap={5}>
                <Input value={serverApiUrl}
                       placeholder="Server api url"
                       onChange={(e) => setServerApiUrl(e.target.value)}
                />
                <Input value={email} style={{maxWidth: 200}}
                       placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}
                />
                <Input value={password} style={{maxWidth: 200}}
                       placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}
                />
                <Input value={label} style={{maxWidth: 200}}
                       placeholder={"Label"}
                       onChange={(e) => setLabel(e.target.value)}
                       onKeyDown={(e) => e.stopPropagation()}
                />
              </Flex>

              <Button loading={isLoading}
                      onClick={onVerifyCredentials}
                      style={{marginTop: 0}}
                      icon={isRequestSuccessful === null ? undefined : isRequestSuccessful ? <CheckOutlined /> : <CloseCircleOutlined />}
              >
                Verify credentials
              </Button>
            </Flex>
          </Flex>

          <Button style={{marginTop: 0, maxWidth: 200}} type="text" icon={<PlusOutlined/>} onClick={addToken}>
            Add request and get token
          </Button>
        </Flex>
      </>
  );
};

export default RequestTokensTab;