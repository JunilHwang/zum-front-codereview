import { State, StoreInitializer } from "../types/types";
import Publisher from "./publisher";

export default class Store {
  events: Publisher;
  mutations: any;
  states: State;

  constructor(storeInitializer: StoreInitializer) {
    this.events = new Publisher();
    this.mutations = storeInitializer.mutations || {};

    let store = this;
    this.states = new Proxy(storeInitializer.states || {}, {
      set: function(states: any, key: any, value: any) {
        states[key] = value;

        store.events.notify('stateChange', store.states);        
        return true;
      }
    });
  }

  commit(mutationName: string, params?: {[key: string]: any} ): void {
    const newStates: State = this.mutations[mutationName](this.states, params);
    this.states = Object.assign(this.states, newStates);
  }
}