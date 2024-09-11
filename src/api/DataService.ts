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
  getAllHandshakesUrlsItems,
  HandshakeListItem,
  saveHandshakeList
} from "./HandshakeUrlService.ts";
import {getAllTokenItems, saveTokensList, TokenListItem} from "./TokenService.ts";

export interface  AppData {
  destinations : DestinationListItem[]
  subscriptions : SubscriptionListItem[]
  handshakesUrls : HandshakeListItem[]
  tokens : TokenListItem[]
}

/**
 * selects all data from local storage and build json
 */
export const exportAllDataAsJson = () => {
  let destinations = getAllDestinationsItems()
  let subscriptions = getAllSubscriptionsItems()
  let handshakesUrls = getAllHandshakesUrlsItems()
  let tokens = getAllTokenItems()

  return {
    destinations : destinations,
    subscriptions : subscriptions,
    handshakesUrls : handshakesUrls,
    tokens : tokens
  }
}

export const importAllData = (data : AppData) => {
  saveDestinationsList(data.destinations)
  saveSubscriptionsList(data.subscriptions)
  saveHandshakeList(data.handshakesUrls)
  saveTokensList(data.tokens)
}