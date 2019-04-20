import { action, computed, flow, observable, when } from "mobx";
import { persist } from "mobx-persist";
import Sound from "react-native-sound";
import { getAudioUrl } from "../utils/player";
import { RootStore } from "./RootStore";

export interface Song {
  title: string;
  videoId: string;
  duration: string;
  audioUrl?: string;
}

export class PlayerStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    Sound.setCategory("Playback", true);
    when(
      () => this.playbackState === "playing",
      () => {
        this.getTime();
      },
    );
  }
  @persist @observable currentSongUrl: string;
  @observable queue: Song[] = [];
  @persist("object") @observable currentSong: any;
  @observable playbackState: string;
  @observable currentSeconds: number;

  @action play(soundUrl?: string) {
    const callback = (e: any, sound: Sound) => {
      if (e) {
        this.playbackState = "error";
        console.log(e);
        return;
      }
      this.playbackState = "playing";
      this.getTime();
      sound.play(() => {
        this.playbackState = "finished";
        sound.release();
        if (this.queue.length > 0) {
          const nextSong = this.queue[0];
          this.queue = this.queue.slice(1);
          this.play(nextSong.audioUrl);
        }
      });
    };
    if (this.playbackState === "playing") {
      this.stop(() => {
        this.playbackState = "stopped";
        this.play(soundUrl);
      });
    } else {
      this.currentSong = new Sound(soundUrl, null, error => {
        callback(error, this.currentSong);
      });
    }
  }
  @action pause() {
    this.currentSong.pause();
    this.playbackState = "paused";
  }
  @action resume() {
    this.currentSong.play();
    this.playbackState = "playing";
  }
  @action stop(callback?: () => void) {
    this.currentSong.pause();
    this.currentSong.stop(callback);
  }
  addToQueue = flow(function*(this: PlayerStore, song: Song) {
    try {
      const audioUrl = yield getAudioUrl(song.videoId);
      this.queue.push({
        ...song,
        ...audioUrl,
      });
    } catch (error) {}
  });
  @action getTime() {
    // if (!this.currentSong.isPlaying) return;
    this.currentSong.getCurrentTime((seconds: number) => {
      this.currentSeconds = Math.floor(seconds);
    });
    setTimeout(() => this.getTime(), 900);
  }
  @computed get duration() {
    return Math.floor(this.currentSong._duration - 1);
  }

  @action setCurrentTime(value: number) {
    const v = Math.floor(value);
    this.currentSong.setCurrentTime(v);
  }
}
