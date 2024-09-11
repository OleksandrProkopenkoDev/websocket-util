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

let index = 0;

const TokenInput: FC<TokenInputProps> = ({
                                           selectedToken,
                                           setSelectedToken,
                                           isConnected,
                                           token,
                                           setToken, handshakeUrl
                                         }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tokens, setTokens] = useState<TokenListItem[]>([])
  const [newToken, setNewToken] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    let arr = getAllTokenItems();
    if (arr[0]) {
      setToken(arr[0])
    }
    setTokens(arr)
  }, [localStorage.getItem(TOKEN_STORAGE_NAME)]);


  const onRemove = (label: string) => {
    setTokens((prevState) => prevState.filter((e) => e.token !== label))
    removeTokenItem(label)
  }

  const addToken = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      saveTokenIfNotSaved(label, newToken)

      setLabel('');
      setNewToken('')
    } catch (err) {
      notification.warning({message: 'Failed to add newToken: ' + err})
    }
  };

  // const onSelectToken = (label: string, tokenItem: any) => {
  //   console.log("onSelectToken", tokenItem)
  //   const selected: TokenListItem = {token: tokenItem.value, label: tokenItem.label}
  //   updateTokenDate(selected.label)
  //   setToken(selected)
  // }

  const onChange = (key: string) => {
    console.log(key);
  };

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tokens from requests',
      children:
          <RequestTokensTab handshakeUrl={handshakeUrl} tokens={tokens.filter((e) => e.request !== undefined)} onRemove={onRemove} addToken={addToken}/>
    },
    {
      key: '2',
      label: 'Saved tokens',
      children:
          <SavedTokensTab tokens={tokens} onRemove={onRemove} addToken={addToken} />

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

        {/*<Select*/}
        {/*    style={{height: "41"}}*/}
        {/*    disabled={isConnected}*/}
        {/*    optionRender={(option) => renderOption(option)}*/}
        {/*    value={''}*/}
        {/*    onSelect={onSelectToken}*/}
        {/*    dropdownRender={(menu) => (*/}
        {/*        <>*/}
        {/*          /!*<Tabs defaultActiveKey="1" items={items} onChange={onChange} />*!/*/}

        {/*          <Divider orientation={"left"} style={{margin: '8px 0'}}>Tokens from requests</Divider>*/}
        {/*          <Divider orientation={"left"} style={{margin: '8px 0'}}>Saved tokens</Divider>*/}
        {/*          {menu}*/}
        {/*          <Divider style={{margin: '8px 0'}}/>*/}
        {/*          <Input style={{fontSize: 12, width: "100%"}}*/}
        {/*                 className={"pt-sans-regular"}*/}
        {/*                 value={newToken}*/}
        {/*                 placeholder="Token"*/}
        {/*                 onChange={(e) => setNewToken(e.target.value)}*/}
        {/*          />*/}

        {/*          <Divider style={{margin: '8px 0'}}/>*/}
        {/*          <Space style={{padding: '0 8px 4px'}}>*/}
        {/*            <Input*/}
        {/*                placeholder="Token label"*/}
        {/*                ref={inputRef}*/}
        {/*                value={label}*/}
        {/*                onChange={onNameChange}*/}
        {/*                onKeyDown={(e) => e.stopPropagation()}*/}
        {/*            />*/}
        {/*            <Button type="text" icon={<CopyOutlined/>} onClick={onGetFromClipboard}>*/}
        {/*              Get token from clipboard*/}
        {/*            </Button>*/}
        {/*            <Button type="text" icon={<PlusOutlined/>} onClick={addToken}>*/}
        {/*              Add token*/}
        {/*            </Button>*/}
        {/*          </Space>*/}
        {/*        </>*/}
        {/*    )}*/}
        {/*    dropdownStyle={{width: 550}}*/}
        {/*    options={tokens.map((item) => ({*/}
        {/*      value: item.token + "",*/}
        {/*      label: item.label + "",*/}
        {/*      key: "label-" + item.label*/}
        {/*    }))}*/}
        {/*/>*/}


        <Tooltip title={<span style={{fontSize: 15,}}>{token === null ? "null" : token.token }</span>}>
          <span style={{
            borderLeft: "black 1px solid",
            fontSize: 20,
            maxWidth: 350,
            background: "var(--select-container-color)",
            padding: "5px 11px", height: 31
          }}
                className={"pt-sans-regular"}>{token === null ? "null" : token.label }</span>

        </Tooltip>

        <Button onClick={() => setIsOpen(true)}>SelectToken</Button>
        <Modal width={700} onOk={() => setIsOpen(false)} open={isOpen} onCancel={() => setIsOpen(false)}>

          <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}/>

        </Modal>

        {/*<Button type={"primary"} style={{marginLeft: "5", height: 41, marginTop: 0}}>Get*/}
        {/*  actual</Button>*/}

        {/*<Tooltip  className={"text"}  title={<span style={{ fontSize: 15, }}><a target={"_blank"} href="https://jwt.io/">Build token</a></span>}>*/}
        {/*  <InfoCircleOutlined  style={{marginLeft: 5}} />*/}
        {/*</Tooltip>*/}
      </Flex>
  );
};

export default TokenInput;