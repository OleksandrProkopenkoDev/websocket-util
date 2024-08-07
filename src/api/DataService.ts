import {getAllDestinationsItems} from "./DestinationService.ts";
import {getAllSubscriptionsItems} from "./SubscriptionService.ts";


export const exportAllDataAsJson = () => {
  let destinations = getAllDestinationsItems()
  let subscriptions = getAllSubscriptionsItems()
  // let  handshakesUrls
}