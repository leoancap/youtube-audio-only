import { action, observable } from "mobx";
import Sound from "react-native-sound";
import { RootStore } from "./RootStore";

export interface video {
  title: string;
  videoId: string;
  audioUrl?: string;
}

export class PlayerStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    Sound.setCategory("Playback", true);
  }
  @observable currentSongUrl: string;
  @observable currentSong: any;
  @observable playbackState: string;

  @action playSound(soundUrl: string) {
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
      this.stopSound(soundUrl);
    } else {
      this.currentSong = new Sound(soundUrl, Sound.MAIN_BUNDLE, error =>
        callback(error, this.currentSong),
      );
    }
  }
  @action stopSound(soundUrl: string) {
    this.currentSong.pause();
    this.currentSong.stop(() => {
      this.playbackState = "stopped";
      this.playSound(soundUrl);
    });
  }
  @action getTime() {
    if (!this.currentSong.isPlaying) return;

    this.currentSong.getCurrentTime((seconds: any) => {
      console.log(seconds);
    });

    setTimeout(() => this.getTime(), 999);
  }
}
