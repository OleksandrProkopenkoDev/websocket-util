import {DestinationListItem} from "./DestinationService.ts";

const NAME = "subscriptions"

export interface SubscriptionListItem {
  destination : string
  addedOn : Date;
}

export const saveSubscriptionIfNotSaved = (destination : string) => {
  let subscriptionsList = getAllSubscriptionsItems();
  let subscription = subscriptionsList.find((e) => e.destination === destination)
   if (!subscription) {
     addSubscriptionItem(destination)
   } else {
     subscription.addedOn = new Date();
     saveSubscriptionsList(subscriptionsList)
   }
}

export const getAllSubscriptions = () : string[] =>  {
  return getAllSubscriptionsItems()
  .sort(function(a,b){
    return new Date(b.addedOn) - new Date(a.addedOn);
  })
  .map((e) => e.destination)
}

const addSubscriptionItem = (destination : string) => {
  let list =getAllSubscriptionsItems();
  let item : SubscriptionListItem = {
    destination : destination,
    addedOn : new Date()
  }
  list.push(item)
  saveSubscriptionsList(list)
}

export const removeSubscriptionItem = (destination : string) => {
  let list =getAllSubscriptionsItems();
  let newList = list.filter((e) => e.destination !== destination)
  localStorage.setItem("subscriptions", JSON.stringify(newList))
}

export const getAllSubscriptionsItems = () : SubscriptionListItem[] =>  {
  let list = JSON.parse(localStorage.getItem("subscriptions"));
  if (list === null) {
    saveSubscriptionsList([])
    return []
  }
  return list;
}

export const saveSubscriptionsList = (list :  SubscriptionListItem[]) => {
  localStorage.setItem(NAME, JSON.stringify(list))
}