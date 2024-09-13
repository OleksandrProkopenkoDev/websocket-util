import {LoginRequest} from "../TokenService.ts";

export const getApiUrlFromProvidedHandshakeUrl = (handshakeUrl? : string) => {
  if (!handshakeUrl) return;
  const serverUrlIndex = handshakeUrl.lastIndexOf(":")
  const serverUrlPar1 = handshakeUrl.substring(0, serverUrlIndex)
  const serverUrlPar2 = handshakeUrl.substring(serverUrlIndex, serverUrlPar1.length + 5)
  return serverUrlPar1 + serverUrlPar2 + "/api/authentication/login";
}

export const prepareLoginRequestInitData = (email : string, password : string) => {
  const requestBody : LoginRequest  = {
    userEmail : email,
    password : password
  };

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }
}
