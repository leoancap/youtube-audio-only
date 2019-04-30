import { create } from "mobx-persist";
import { createContext } from "react";
import { AsyncStorage } from "react-native";
import { SearchStore } from "./SearchStore";
import { LandingStore } from "./LandingStore";
import { PlayerStore } from "./PlayerStore";
import { RouterStore } from "./RouterStore";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export class RootStore {
  routerStore = new RouterStore(this);
  searchStore = new SearchStore(this);
  playerStore = new PlayerStore(this);
  landingStore = new LandingStore(this);
  constructor() {
    hydrate("searchStore", this.searchStore).then(() => {
      // if (this.searchStore.searchText) {
      //   this.searchStore.fetchVideos(this.searchStore.searchText);
      // }
    });
  }
}

export const RootStoreContext = createContext(new RootStore());
