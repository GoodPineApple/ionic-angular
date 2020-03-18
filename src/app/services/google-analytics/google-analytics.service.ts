import { Injectable } from "@angular/core";

declare let gtag: Function;

@Injectable({
  providedIn: "root"
})
export class GoogleAnalyticsService {
  constructor() {}

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    gtag("event", eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      event_action: eventAction,
      event_value: eventValue
    });
  }

  public trackUserTiming(name, category?, label?) {
    if (window.performance) {
      const timeSincePageLoad = Math.round(performance.now());

      gtag("event", "load_timing", {
        name: name,
        value: timeSincePageLoad,
        event_category: category,
        event_label: label
      });
    }
  }

  public trackScreenView(screenName) {
    gtag("event", "screen_view", {
      app_name: "shaa_shop",
      screen_name: screenName,
      app_version: "2.0"
    });
  }
}
