import {Subscription as StompJsSubscription} from "stompjs";

export interface Subscription {
  destination : string
  subscription :  StompJsSubscription
}