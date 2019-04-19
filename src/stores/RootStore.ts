import { create } from "mobx-persist";
import { createContext } from "react";
import { AsyncStorage } from "react-native";
import { ListingStore } from "./LandingScreen";
import { PlayerStore } from "./PlayerStore";
import { RouterStore } from "./RouterStore";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export class RootStore {
  routerStore = new RouterStore(this);
  listingStore = new ListingStore(this);
  playerStore = new PlayerStore(this);
  constructor() {
    hydrate("listingStore", this.listingStore).then(() => {
      // if (this.listingStore.searchText) {
      //   this.listingStore.fetchVideos(this.listingStore.searchText);
      // }
    });
  }
}

export const RootStoreContext = createContext(new RootStore());
