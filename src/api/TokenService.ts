import {saveDestinationsList} from "./DestinationService.ts";

export const TOKEN_STORAGE_NAME = "tokens"

export interface TokenListItem {
  label : string
  token: string
  addedOn: Date;
}
export interface IToken {
  label : string
  token: string
}

export const saveToken = (label : string, token: string) => {
  let tokensListItems = getAllTokenItems();
  let tokenListItem = tokensListItems.find((e) => e.token === token)
  if (!tokenListItem) {
    addTokenItem(label,token)
  } else {
    tokenListItem.addedOn = new Date();
    saveTokensList(tokensListItems)
  }
}

export const updateTokenDate = (token : IToken) => {
  let tokensListItems = getAllTokenItems();
  let tokenListItem = tokensListItems.find((e) => e.token === token.token)
  if (tokenListItem) {
    tokenListItem.addedOn = new Date();
    saveTokensList(tokensListItems)
  }
}

export const getAllTokens = (): string[] => {
  return getAllTokenItems()
  .sort(function (a, b) {
    return new Date(b.addedOn) - new Date(a.addedOn);
  })
  .map((e) => e.token)
}

const addTokenItem = (label : string, url: string) => {
  let list = getAllTokenItems();
  let item: TokenListItem = {
    label : label,
    token: url,
    addedOn: new Date()
  }
  list.push(item)
  saveTokensList(list)
}

export const removeTokenItem = (label: string) => {
  let list = getAllTokenItems();
  let newList = list.filter((e) => e.label !== label)
  saveTokensList(newList)
}

export const getAllTokenItems = (): TokenListItem[] => {
  let list = localStorage.getItem(TOKEN_STORAGE_NAME)
  if (list) {
    return JSON.parse(list).sort(function (a, b) {
      return new Date(b.addedOn) - new Date(a.addedOn);
    });
  } else {
    saveDestinationsList([])
    return []
  }


  // let list = JSON.parse(localStorage.getItem(TOKEN_STORAGE_NAME));
  // if (list === null) {
  //   saveTokensList([])
  //   return []
  // }
  // return list;
}

export const saveTokensList = (list: TokenListItem[]) => {
  localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(list))
}