import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Button,
  Divider,
  Flex, Input,
  InputRef,
  List,
  Modal,
  notification, Space,
  Tabs,
  TabsProps,
  Tooltip
} from "antd";
import {CloseOutlined, CopyOutlined, PlusOutlined} from "@ant-design/icons";
import {
  getAllTokenItems,
  removeTokenItem, saveTokenIfNotSaved,
  TOKEN_STORAGE_NAME,
  TokenListItem, updateTokenDate,
} from "../../api/TokenService.ts";
import SavedTokensTab from "./SavedTokensTab.tsx";
import RequestTokensTab from "./RequestTokensTab.tsx";

interface TokenInputProps {
  token: TokenListItem | null
  handshakeUrl : string
  isConnected: boolean
  setToken: (value: (((prevState: TokenListItem) => TokenListItem) | TokenListItem)) => void
}

const getTokenInfo = (token : TokenListItem) => {
  return <Flex vertical>
    <span style={{color: "green"}}>Token:</span> {token.token}
    {token.user &&
      <Flex vertical>
        <span style={{color: "green"}}>ID :</span> {token.user.id}
        <span style={{color: "green"}}>UserName :</span> {token.user.userName}
        <span style={{color: "green"}}>userEmail :</span> {token.user.userEmail}
      </Flex>
    }
  </Flex>
}

const TokenInput: FC<TokenInputProps> = ({
                                           selectedToken,
                                           setSelectedToken,
                                           isConnected,
                                           token,
                                           setToken, handshakeUrl
                                         }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tokens, setTokens] = useState<TokenListItem[]>([])

  useEffect(() => {
    console.log("upd tokens")
  }, [tokens]);


  useEffect(() => {
    console.log("useEffect getAllTokenItems localStorage.getItem(TOKEN_STORAGE_NAME)")
    let arr = getAllTokenItems();
    if (arr[0]) {
      setToken(arr[0])
    }
    setTokens(arr)
  }, []);


  const onRemove = (label: string) => {
    setTokens((prevState) => prevState.filter((e) => e.token !== label))
    removeTokenItem(label)
  }

  const onSelectToken = (selectedTokenItem : TokenListItem) => {
    console.log("onSelectToken", selectedTokenItem)

    updateTokenDate(selectedTokenItem.label)
    setToken(selectedTokenItem)
    setIsOpen(false)
  }

  const onChange = (key: string) => {
    console.log(key);
  };

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tokens from requests',
      children:
          <RequestTokensTab onSelectToken={onSelectToken}
              handshakeUrl={handshakeUrl}
              tokens={tokens.filter((e) => e.request !== undefined)}
              onRemove={onRemove}
              setTokens={setTokens}
          />
    },
    {
      key: '2',
      label: 'Saved tokens',
      children:
          <SavedTokensTab setTokens={setTokens}
                          tokens={tokens.filter((e) => e.request === undefined)}
                          onRemove={onRemove}
                          onSelectToken={onSelectToken}
          />

    }
  ];


  return (
      <Flex style={{fontSize: 20}}
            align={"center"}
            justify={"flex-start"}
            className={"pt-sans-regular"}
      >
        <span className={"pt-sans-regular text"}
              style={{fontWeight: "bold", marginRight: 10}}>Token: </span>

        <Tooltip placement={"bottomRight"} title={<span style={{fontSize: 15,}}>{token === null ? "null" :  getTokenInfo(token) }</span>}>
          <span  style={{
            borderLeft: "black 1px solid",
            fontSize: 20,
            maxWidth: 350,
            backgroundColor: isConnected ? "var(--disabled-bg-color)" : "var(--text-color)",
            color: isConnected ? "#ababab" : "black",
            padding: "5px 11px", height: 31
          }}
                className={"pt-sans-regular"}>{token === null ? "null" : token.label }</span>

        </Tooltip>

        <Button style={{height: 41, marginTop: 0}} type={"primary"} disabled={isConnected} onClick={() => setIsOpen(true)}>SelectToken</Button>
        <Modal width={700} onOk={() => setIsOpen(false)} open={isOpen} onCancel={() => setIsOpen(false)}>

          <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}/>

        </Modal>
      </Flex>
  );
};

export default TokenInput;