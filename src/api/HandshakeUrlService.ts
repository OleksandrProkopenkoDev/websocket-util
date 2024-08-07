const NAME = "handshakeUrls"
interface HandshakeListItem {
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
    saveList(handshakeListItems)
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
  console.log("save list", list)
  saveList(list)
}

export const removeHandshakeUrlItem = (url : string) => {
  let list =getAllHandshakesUrlsItems();
  let newList = list.filter((e) => e.url !== url)
  saveList(newList)
}

const getAllHandshakesUrlsItems = () : HandshakeListItem[] =>  {
  let list = JSON.parse(localStorage.getItem(NAME));
  if (list === null) {
    saveList([])
    return []
  }
  return list;
}

const saveList = (list :  HandshakeListItem[]) => {
  localStorage.setItem(NAME, JSON.stringify(list))
}