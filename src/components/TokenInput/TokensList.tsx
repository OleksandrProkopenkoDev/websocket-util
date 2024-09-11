import React, {FC} from 'react';
import {Button, Flex, List} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {TokenListItem} from "../../api/TokenService.ts";

interface TokensListProps {
  tokens : TokenListItem[]
  onRemove : (label: string) => void
}

const TokensList:FC<TokensListProps> = ({tokens, onRemove}) => {
  return (
      <List dataSource={tokens}
            renderItem={(tokenListItem) => (
                <Flex gap={5}
                      key={"option-" + tokenListItem}
                      align={"center"}
                      justify={"space-between"}
                      className={"pt-sans-regular"}
                      style={{
                        backgroundColor: "rgba(0,0,0,0.05)",
                        margin: "5px 0",
                        padding: 5,
                        cursor: "pointer"
                      }}
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
                  <Button danger
                          onClick={() => onRemove(tokenListItem.label)}
                          icon={<CloseOutlined/>}
                  />
                </Flex>
            )}
      />
  );
};

export default TokensList;