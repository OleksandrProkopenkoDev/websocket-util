import React, {FC, useState} from 'react';
import {Button, Divider, Input, notification, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {saveTokenIfNotSaved, TokenListItem} from "../../api/TokenService.ts";
import TokensList from "./TokensList.tsx";

interface SavedTokensTabProps {
  onSelectToken : (selectedTokenItem: TokenListItem) => void
  tokens : TokenListItem[]
  onRemove : (label: string) => void
  setTokens: (value: (((prevState: TokenListItem[]) => TokenListItem[]) | TokenListItem[])) => void

}

const SavedTokensTab:FC<SavedTokensTabProps> = ({tokens, onRemove, setTokens, onSelectToken}) => {
  const [newToken, setNewToken] = useState('');
  const [label, setLabel] = useState('');

  const addToken = () => {
    try {
      const saved = saveTokenIfNotSaved(newToken, label)
      console.log("saved token", saved)
      tokens.push(saved)
      setTokens(tokens)

      setLabel('');
      setNewToken('')
    } catch (err) {
      notification.warning({message: 'Failed to add newToken: ' + err})
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  return (
      <>
        <TokensList onSelectToken={onSelectToken} setTokens={setTokens} tokens={tokens.filter((e) => e.request === undefined)} onRemove={onRemove}/>

        <Divider orientation={"left"} style={{margin: '8px 0'}}>Add new token</Divider>
        <Space style={{padding: '0 8px 4px'}}>
          <Input style={{fontSize: 18}}
                 className={"pt-sans-regular"}
                 value={newToken}
                 placeholder="Token"
                 onChange={(e) => setNewToken(e.target.value)}
          />
          <Input style={{fontSize: 16}}
                 placeholder="Token label"
                 value={label}
                 onChange={onNameChange}
                 onKeyDown={(e) => e.stopPropagation()}
          />
          <Button style={{marginTop: 0}} type="text" icon={<PlusOutlined/>} onClick={addToken}>
            Add token
          </Button>
        </Space>
      </>
  );
};

export default SavedTokensTab;