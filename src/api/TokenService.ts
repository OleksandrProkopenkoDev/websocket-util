import {GenericStorageService} from "./GenericStorageService.ts";

export const TOKEN_STORAGE_NAME = "tokens"

export interface TokenListItem {
  label : string
  token: string
  addedOn: Date;
  request? : LoginRequest
  user? : UserDto
}

export interface LoginRequest {
  serverApiUrl? : string
  userEmail: string
  password : string
}

export interface LoginResponse {
  token : string
  userDto : UserDto
}

interface UserDto {
  id: number
  userName : string ,
  userEmail: string
}

const tokenService = new GenericStorageService<TokenListItem>("tokens", "label");

export const saveTokenIfNotSaved = (token: string, label : string) => {
  const newItem: TokenListItem = { token, addedOn: new Date(), label: label };
  tokenService.saveItemIfNotSaved(newItem);
};

export const updateTokenDate = (label: string) => {
  tokenService.updateItemDate(label);
};

export const saveRequestTokenIfNotSaved = (token: string, label : string) => {
  const newItem: TokenListItem = { token, addedOn: new Date(), label: label };
  tokenService.saveItemIfNotSaved(newItem);
};

export const getAllTokenItems = (): TokenListItem[] => {
  return tokenService.getAllItems();
};

export const getAllRequestTokens = () : TokenListItem[] => {
  return tokenService.getAllItems().filter((token) => token.request !== undefined)
}
export const saveTokensList = (list : TokenListItem[]) => {
  return tokenService.saveItemsList(list);
};

export const removeTokenItem = (label: string) => {
  tokenService.removeItem(label);
};
