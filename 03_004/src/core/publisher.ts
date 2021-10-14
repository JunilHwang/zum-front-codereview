import { EventObserverList } from "../types/types";

export default class Publisher {
  events: EventObserverList = {};

  subscribe(eventName: string, fn: Function): void {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }

  notify(eventName: string, newStates: any): void {
    if (this.events.hasOwnProperty(eventName)) {
      this.events[eventName].forEach( (event: Function) => {
        event(newStates);
      })
    }
  }
}