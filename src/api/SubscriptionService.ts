import {GenericStorageService} from "./GenericStorageService.ts";

export interface SubscriptionListItem {
  destination : string
  addedOn : Date;
}

const subscriptionService = new GenericStorageService<SubscriptionListItem>("subscriptions", "destination");

export const saveSubscriptionIfNotSaved = (destination: string) => {
  const newItem: SubscriptionListItem = { destination, addedOn: new Date() };
  subscriptionService.saveItemIfNotSaved(newItem);
};

export const getAllSubscriptions = (): string[] => {
  return subscriptionService.getAllItemsSortedByDate();
};

export const getAllSubscriptionsItems = (): SubscriptionListItem[] => {
  return subscriptionService.getAllItems();
};
export const saveSubscriptionsList = (list : SubscriptionListItem[]) => {
  return subscriptionService.saveItemsList(list);
};


export const removeSubscriptionItem = (destination: string) => {
  subscriptionService.removeItem(destination);
};
