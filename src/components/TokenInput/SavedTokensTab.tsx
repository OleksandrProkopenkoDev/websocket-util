import React, {FC, useState} from 'react';
import {Button, Divider, Input, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {TokenListItem} from "../../api/TokenService.ts";
import TokensList from "./TokensList.tsx";

interface SavedTokensTabProps {
  tokens : TokenListItem[]
  onRemove : (label: string) => void
  addToken : (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const SavedTokensTab:FC<SavedTokensTabProps> = ({tokens, onRemove, addToken}) => {
  const [newToken, setNewToken] = useState('');
  const [label, setLabel] = useState('');

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  return (
      <>
        <TokensList tokens={tokens} onRemove={onRemove}/>

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