import {getAllTokenItems, IToken, saveTokensList} from "./TokenService.ts";

const NAME = "handshakeUrls"
export interface HandshakeListItem {
  url : string
  addedOn : Date;
}

export const saveHandshakeUrlIfNotSaved = (url : string) => {
  let handshakeListItems = getAllHandshakesUrlsItems();
  let handshake = handshakeListItems.find((e) => e.url === url)
  if (!handshake) {
    addHandshakesUrl(url)
  } else {
    handshake.addedOn = new Date();
    saveHandshakeList(handshakeListItems)
  }
}

export const updateHandshakeUrlDate = (url : string) => {
  let handshakeListItems = getAllHandshakesUrlsItems();
  let item = handshakeListItems.find((e) => e.url === url)
  if (item) {
    item.addedOn = new Date();
    saveHandshakeList(handshakeListItems)
  }
}

export const getAllHandshakesUrls = () : string[] =>  {
  return getAllHandshakesUrlsItems()
  .sort(function(a,b){
    return new Date(b.addedOn) - new Date(a.addedOn);
  })
  .map((e) => e.url)
}

const addHandshakesUrl = (url : string) => {
  let list =getAllHandshakesUrlsItems();
  let item : HandshakeListItem = {
    url : url,
    addedOn : new Date()
  }
  list.push(item)
  saveHandshakeList(list)
}

export const removeHandshakeUrlItem = (url : string) => {
  let list =getAllHandshakesUrlsItems();
  let newList = list.filter((e) => e.url !== url)
  saveHandshakeList(newList)
}

export const getAllHandshakesUrlsItems = () : HandshakeListItem[] =>  {
  let list = JSON.parse(localStorage.getItem(NAME));
  if (list === null) {
    saveHandshakeList([])
    return []
  }
  return list;
}

export const saveHandshakeList = (list :  HandshakeListItem[]) => {
  localStorage.setItem(NAME, JSON.stringify(list))
}