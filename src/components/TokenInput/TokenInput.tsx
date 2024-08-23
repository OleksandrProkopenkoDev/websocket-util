import React, {FC, useEffect, useRef, useState} from 'react';
import {Button, Divider, Flex, Input, InputRef, notification, Select, Space, Tooltip} from "antd";
import {CloseOutlined, CopyOutlined, InfoCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {
  getAllTokenItems,
  IToken,
  removeTokenItem,
  saveToken,
  TOKEN_STORAGE_NAME,
  TokenListItem, updateTokenDate
} from "../../api/TokenService.ts";

interface TokenInputProps {
  token : IToken
  isConnected : boolean
  setToken: (value: (((prevState: IToken) => IToken) | IToken)) => void
}
let index = 0;

const TokenInput:FC<TokenInputProps> = ({selectedToken, setSelectedToken, isConnected, token, setToken}) => {
  const [tokens, setTokens] = useState<TokenListItem[]>([])
  const [newToken, setNewToken] = useState('');
  const [label, setLabel] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onRemove = (label : string) => {
    setTokens((prevState) => prevState.filter((e) => e.token !== label))
    removeTokenItem(label)
  }

  useEffect(() => {
    let arr = getAllTokenItems();
    if (arr[0]) {
      setToken(arr[0])
    }
    setTokens(arr)
  }, [localStorage.getItem(TOKEN_STORAGE_NAME)]);

  const renderOption = (tokenListItem: any) => {
    return <Flex gap={5}
                 key={"option-" + tokenListItem}
                 align={"center"}
                 justify={"space-between"}
                 className={"pt-sans-regular"}
    >
      <Flex vertical gap={2}>
                <span
                    style={{fontSize: 18}}>
                  {tokenListItem.label}
                </span>
        <Tooltip placement="topLeft" title={<span style={{ fontSize: 15, }}>{tokenListItem.value}</span>}>
                <span
                    style={{fontSize: 12, maxWidth: 200}}>
                    {tokenListItem.value}
                </span>
        </Tooltip>
      </Flex>
      <Button danger
              onClick={() => onRemove(tokenListItem.label)}
              icon={<CloseOutlined/>}
      />
    </Flex>;
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const addToken = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    try {
      e.preventDefault();

      // setTokens([...items, label || `New item ${index++}`]);
      saveToken(label, newToken)

      setLabel('');
      setNewToken('')
    } catch (err) {
      notification.warning({message: 'Failed to add newToken: ' + err})
    }
  };

  const onSelectToken = (label : string, tokenItem : any ) => {
    console.log("onSelectToken", tokenItem)
    const selected : IToken = {token: tokenItem.value, label : tokenItem.label}
    updateTokenDate(selected)
    // saveToken(tokenItem.label, tokenItem.newToken)
    setToken(selected)
  }

  const onGetFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setNewToken(text);
    } catch (err) {
      notification.warning({message: 'Failed to read clipboard contents: ' + err})
    }
  }

  return (
      <Flex style={{fontSize: 20}}
            align={"center"}
            justify={"flex-start"}
            className={"pt-sans-regular"}
      >
        <span className={"pt-sans-regular"} style={{fontWeight: "bold", marginRight: 10}}>Token: </span>
        <Select
            disabled={isConnected}
            optionRender={(option) => renderOption(option)}
            value={''}
            onSelect={onSelectToken}
            dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{margin: '8px 0'}}/>
                  <Input style={{fontSize: 12, width: "100%"}}
                         className={"pt-sans-regular"}
                         value={newToken}
                         placeholder="Token"
                         onChange={(e) => setNewToken(e.target.value)}
                  />

                  <Divider style={{margin: '8px 0'}}/>
                  <Space style={{padding: '0 8px 4px'}}>
                    <Input
                        placeholder="Token label"
                        ref={inputRef}
                        value={label}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="text" icon={<CopyOutlined/>} onClick={onGetFromClipboard}>
                      Get token from clipboard
                    </Button>
                    <Button type="text" icon={<PlusOutlined/>} onClick={addToken}>
                      Add token
                    </Button>
                  </Space>
                </>
            )}
            dropdownStyle={{width: 550}}
            options={tokens.map((item) => ({
              value: item.token + "",
              label: item.label + "",
              key: "label-" + item.label
            }))}
        />
        <Tooltip  title={<span style={{ fontSize: 15, }}>{token.token}</span>}>
        <span style={{
          fontSize: 20,
          maxWidth: 350,
          border: "#d9d9d9 solid 1px",
          background: "#ffffff",
          borderRadius: 6,
          padding: "4px 11px"
        }}
              className={"pt-sans-regular"}>{token.label}</span>
        </Tooltip>


        <Tooltip  title={<span style={{ fontSize: 15, }}><a target={"_blank"} href="https://jwt.io/">Build token</a></span>}>
          <InfoCircleOutlined  style={{marginLeft: 5}} />

        </Tooltip>

      </Flex>
  );
};

export default TokenInput;