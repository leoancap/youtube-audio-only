import { configure, observable, action } from "mobx";
import { Video } from "./PlayerStore";
import { RootStore } from "./RootStore";
import { Dimensions } from "react-native";

// configure({
//   enforceActions: "always",
// });

export class LandingStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable fabPosition: string = "";
  @observable itemInFab: Video;

  @observable sliderFocused: boolean = false;

  @action.bound
  toggleSliderFocused() {
    this.sliderFocused = !this.sliderFocused;
  }

  @action.bound
  openFab(e: { nativeEvent: { pageY: number } }, itemToputInFab: Video) {
    const { height } = Dimensions.get("window");
    const perc = e.nativeEvent.pageY / height;
    this.fabPosition = (perc * 100).toFixed(2) + "%";
    this.itemInFab = itemToputInFab;
  }

  @action.bound
  closeFab() {
    this.fabPosition = "";
  }
}
