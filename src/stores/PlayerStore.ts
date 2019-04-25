import { action, flow, observable } from "mobx";
import { persist } from "mobx-persist";
import { getAudioUrl } from "../utils/player";
import { RootStore } from "./RootStore";

export interface Video {
  title: string;
  videoId: string;
  duration: string;
  audioUrl?: string;
  seconds: number;
}

export class PlayerStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @persist @observable currentSong: Video;
  @observable queue: Video[] = [];
  @observable playbackState: string;
  @observable currentTime: number;
  @observable rate: number = 1.0;

  @action play(video: Video) {
    this.currentSong = video;
    this.playbackState = "playing";
  }

  @action pause() {
    this.playbackState = "paused";
  }

  @action resume() {
    this.playbackState = "playing";
  }

  addToQueue = flow(function*(this: PlayerStore, video: Video) {
    try {
      const audioUrl = yield getAudioUrl(video.videoId);
      this.queue.push({
        ...video,
        ...audioUrl,
      });
    } catch (error) {}
  });
}
