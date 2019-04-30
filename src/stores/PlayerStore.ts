import { action, flow, observable, runInAction } from "mobx";
import { persist } from "mobx-persist";
import { getAudioUrl } from "../utils/player";
import { RootStore } from "./RootStore";
import { asyncAction } from "mobx-utils";

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
  @observable playbackState: string;
  @observable currentTime: number;
  @observable rate: number = 1.0;
  @observable queue: Video[] = [];

  @action.bound
  play(video: Video) {
    this.currentSong = video;
    this.playbackState = "playing";
  }

  @action.bound
  setCurrentTime(value: number) {
    this.currentTime = value;
  }

  @action.bound
  pause() {
    this.playbackState = "paused";
  }

  @action.bound
  handleOnEnd() {
    if (this.queue.length > 0) {
      const nextSong = this.queue.shift();
      this.play(nextSong as Video);
    }
  }

  @action.bound
  resume() {
    this.playbackState = "playing";
  }

  @action.bound
  async addToQueue(video: Video) {
    try {
      const audioUrl = await getAudioUrl(video.videoId);

      runInAction(() => {
        this.queue.push({
          ...video,
          audioUrl: audioUrl as string,
        });
      });
    } catch (error) {}
  }

  fetchAudioUrlAndPlay = flow(function*(this: PlayerStore, video: Video) {
    try {
      const response = yield getAudioUrl(video.videoId);
      this.play({
        ...video,
        audioUrl: response,
      });
    } catch (error) {}
  });
}
