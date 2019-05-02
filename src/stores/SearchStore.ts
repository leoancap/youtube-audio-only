import {
  configure,
  flow,
  observable,
  reaction,
  action,
  IReactionDisposer,
  autorun,
} from "mobx"
import { persist } from "mobx-persist"
import { getAudioUrl } from "../utils/player"
import { search } from "../utils/searchOptimized"
import { Video } from "./PlayerStore"
import { RootStore } from "./RootStore"
import { Animated, Dimensions } from "react-native"
import { fromPromise, IPromiseBasedObservable } from "mobx-utils"

// configure({
//   enforceActions: "always",
// });

export class SearchStore {
  rootStore: RootStore
  searchPromise: IPromiseBasedObservable<any>

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    autorun(() => {
      this.searchPromise = fromPromise(search(this.term))
    })
  }

  @persist @observable term: string
  @observable errorMsg = ""
  @observable drawerOpen: boolean = false
  @observable searchFocused: boolean = false

  @action.bound
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  @action.bound
  toggleSearchFocused() {
    this.searchFocused = !this.searchFocused
  }

  @action.bound
  setSearchText(text: string) {
    this.term = text
  }
}
