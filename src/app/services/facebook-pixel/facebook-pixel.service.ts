import { Injectable } from "@angular/core";

declare let fbq: Function;

@Injectable({
  providedIn: "root"
})
export class FacebookPixelService {
  constructor() {}
  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    fbq("event", eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }
}
