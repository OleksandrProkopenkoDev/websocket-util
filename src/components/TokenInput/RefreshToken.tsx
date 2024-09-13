import React, {FC, useState} from 'react';
import {TokenListItem} from "../../api/TokenService.ts";
import {Button, notification} from "antd";
import {UndoOutlined} from "@ant-design/icons";
import {prepareLoginRequestInitData} from "../../api/util/TokenUtils.ts";

interface RefreshTokenProps {
  updateTokenByLabel :(label: string, newToken: string) => void
  token: TokenListItem
}

const RefreshToken: FC<RefreshTokenProps> = ({token, updateTokenByLabel}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendWarning = (message : string, description? : string) => {
    notification.warning({message: message, description});
  }

  const createLoginRequest = async () => {
    const request = token.request;
    if (!request) {
      notification.warning({message: "error. request data is undefined"})
      return;
    }
    if (!request.serverApiUrl) {
      notification.warning({message: "error. serverApiUrl is undefined"})
      return;
    }

    const requestDetails = prepareLoginRequestInitData(request.userEmail, request.password)

    setIsLoading(true)
    fetch(request.serverApiUrl, requestDetails)
    .then(response => {
      setIsLoading(false)
      if (response.status != '200') {
        sendWarning("Error happend during request.", "Status code is + "+ response.status)
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data != null) {
        console.log(data)
        setIsLoading(false)
        updateTokenByLabel(token.label, data.token)
      }
    })
    .catch(error => {
      sendWarning( "Error happend during request.", error)
      setIsLoading(false)
    });
  }

  return token.request ?
      (
          <Button loading={isLoading}
                  onClick={createLoginRequest}
                  title={"Refresh token"}
                  icon={<UndoOutlined/>}
          />

      ) :
      (<></>)
};

export default RefreshToken;