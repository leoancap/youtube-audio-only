import { action, observable } from "mobx";
import { persist } from "mobx-persist";
import Sound from "react-native-sound";
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
  }
  @persist @observable currentSongUrl: string;
  @persist("list") @observable queue: Song[] = [];
  @persist("object") @observable currentSong: any;
  @observable playbackState: string;

  @action play(soundUrl?: string) {
    if (!soundUrl) soundUrl = this.currentSongUrl;
    const callback = (e: any, sound: Sound) => {
      if (e) {
        this.playbackState = "error";
        console.log(e);
        return;
      }
      this.playbackState = "playing";
      sound.play(() => {
        this.playbackState = "finished";
        sound.release();
      });
    };
    if (this.playbackState === "playing") {
      this.stop(() => {
        this.playbackState = "stopped";
        this.play(soundUrl);
      });
    } else {
      this.currentSong = new Sound(soundUrl, Sound.MAIN_BUNDLE, error =>
        callback(error, this.currentSong),
      );
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
  @action addToQueue(song: Song) {}
  @action getTime() {
    if (!this.currentSong.isPlaying) return;

    this.currentSong.getCurrentTime((seconds: any) => {
      console.log(seconds);
    });

    setTimeout(() => this.getTime(), 999);
  }
}
