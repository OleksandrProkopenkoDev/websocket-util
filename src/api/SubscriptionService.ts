import {DestinationListItem} from "./DestinationService.ts";

const NAME = "subscriptions"

interface SubscriptionListItem {
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
     saveList(subscriptionsList)
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
  saveList(list)
}

export const removeSubscriptionItem = (destination : string) => {
  let list =getAllSubscriptionsItems();
  let newList = list.filter((e) => e.destination !== destination)
  localStorage.setItem("subscriptions", JSON.stringify(newList))
}

export const getAllSubscriptionsItems = () : SubscriptionListItem[] =>  {
  console.log("get all sb")
  let list = JSON.parse(localStorage.getItem("subscriptions"));
  if (list === null) {
    saveList([])
    return []
  }
  return list;
}

const saveList = (list :  SubscriptionListItem[]) => {
  localStorage.setItem(NAME, JSON.stringify(list))
}