import React, {FC, ReactElement} from 'react';
import {Button, Flex, List, Tooltip} from "antd";
import {CheckCircleOutlined, CloseOutlined, WarningOutlined} from "@ant-design/icons";
import {TokenListItem} from "../../api/TokenService.ts";
import classes from './Token.module.css'


interface TokensListProps {
  onSelectToken : (selectedTokenItem: TokenListItem) => void
  tokens : TokenListItem[]
  onRemove : (label: string) => void
}

function isTokenExpired(token) : ReactElement {
  try {
    // Decode the token (the payload is base64 encoded)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var decodedToken = JSON.parse(atob(base64));

  } catch (e) {
    return <Tooltip title={"Invalid token"}>
      <WarningOutlined style={{color : "#ff9202", fontSize: 20}} />
    </Tooltip>
  }

  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if token is expired
  if (decodedToken.exp < currentTime) {
   return <Tooltip title={"Expired token"} >
      <WarningOutlined style={{color : "#ff9202", fontSize: 20}} />
    </Tooltip>
  } else {
    return <Tooltip title={"Valid token"} >
      <CheckCircleOutlined  style={{color : "green", fontSize: 20}} />
    </Tooltip>
  }
}

const TokensList:FC<TokensListProps> = ({tokens, onRemove, onSelectToken}) => {
  return (
      <List dataSource={tokens}
            renderItem={(tokenListItem) => (
                <Flex gap={5}
                      key={"option-" + tokenListItem}
                      align={"center"}
                      justify={"space-between"}
                      className={["pt-sans-regular", classes.token].join(' ')}
                      style={{
                        backgroundColor: "rgba(0,0,0,0.05)",
                        margin: "5px 0",
                        padding: 5,
                        cursor: "pointer"
                      }}
                      onClick={() => onSelectToken(tokenListItem)}
                >
                  <Flex vertical gap={2}>
                          <span style={{
                            fontSize: 18,
                            fontWeight: "bold"
                          }}>{tokenListItem.label}</span>
                    <span
                        style={{fontSize: 12, wordBreak: "break-word"}}>
                    {tokenListItem.token}
                </span>
                  </Flex>
                  <Flex gap={5}>
                    {isTokenExpired(tokenListItem.token)}
                    <Button danger
                            onClick={() => onRemove(tokenListItem.label)}
                            icon={<CloseOutlined/>}
                    />
                  </Flex>
                </Flex>
            )}
      />
  );
};

export default TokensList;