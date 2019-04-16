import Sound from "react-native-sound";
import ytdl from "react-native-ytdl";

export function getAudioUrl(videoId: string) {
  return new Promise((res, rej) => {
    ytdl.getInfo(videoId, {}, (err: any, info: { formats: any }) => {
      if (err) {
        console.log(err);
        rej(err);
      }
      let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
      const audioUrl = audioFormats[0].url;
      const audioInfo = {
        thumbnailUrl: info.thumbnail_url,
        audioUrl: audioUrl,
      };
      res(audioInfo);
    });
  });
}

export function createAudio(audioUrl: string) {
  var sound = new Sound(audioUrl, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log(error);
    }
    sound.play(() => {
      sound.release();
    });
  });
  return sound;
}

export class CreateAudio {
  sound: Sound;
  constructor(soundUrl: string) {
    this.sound = new Sound(soundUrl, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("error loading the song");
        return;
      }
      this.sound.getDuration();
    });
  }
  stop() {
    if (this.sound) {
      this.sound.stop();
      this.sound.setCurrentTime(0, 0);
    }
  }
  play() {
    this.sound.play(() => {});
  }
}
