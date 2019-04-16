import { observable } from "mobx";
import { RootStore } from "./RootStore";

type Routes = "ListingScreen" | "PlayerScreen";

export class RouterStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable screen: Routes = "ListingScreen";
}
