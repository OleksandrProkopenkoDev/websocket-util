import {
  DestinationListItem,
  getAllDestinationsItems,
  saveDestinationsList
} from "./DestinationService.ts";
import {
  getAllSubscriptionsItems,
  saveSubscriptionsList,
  SubscriptionListItem
} from "./SubscriptionService.ts";
import {
  getAllHandshakesUrls,
  getAllHandshakesUrlsItems,
  HandshakeListItem, saveHandshakeList
} from "./HandshakeUrlService.ts";

export interface AppData {
  destinations : DestinationListItem[]
  subscriptions : SubscriptionListItem[]
  handshakesUrls : HandshakeListItem[]
}

/**
 * selects all data from local storage and build json
 */
export const exportAllDataAsJson = () => {
  let destinations = getAllDestinationsItems()
  let subscriptions = getAllSubscriptionsItems()
  let  handshakesUrls = getAllHandshakesUrlsItems()

  return {
    destinations : destinations,
    subscriptions : subscriptions,
    handshakesUrls : handshakesUrls
  }
}

export const importAllData = (data : AppData) => {
  saveDestinationsList(data.destinations)
  saveSubscriptionsList(data.subscriptions)
  saveHandshakeList(data.handshakesUrls)
}