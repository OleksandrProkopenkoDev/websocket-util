import {GenericStorageService} from "./GenericStorageService.ts";

export interface HandshakeListItem {
  url : string
  addedOn : Date;
}
const handshakeService = new GenericStorageService<HandshakeListItem>("handshakeUrls", "url");

export const saveHandshakeUrlIfNotSaved = (url: string) => {
  const newItem: HandshakeListItem = { url, addedOn: new Date() };
  handshakeService.saveItemIfNotSaved(newItem);
};

export const updateHandshakeUrlDate = (url: string) => {
  handshakeService.updateItemDate(url);
};

export const getAllHandshakesUrls = (): string[] => {
  return handshakeService.getAllItemsSortedByDate();
};

export const getAllHandshakesUrlsItems = (): HandshakeListItem[] => {
  return handshakeService.getAllItems();
};

export const saveHandshakeList = (list : HandshakeListItem[]) => {
  handshakeService.saveItemsList(list)
}

export const removeHandshakeUrlItem = (url: string) => {
  handshakeService.removeItem(url);
};
