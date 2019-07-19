import Sound from "react-native-sound"
import ytdl from "react-native-ytdl"

export function getAudioUrl(videoId: string) {
  return new Promise((res, rej) => {
    ytdl.getInfo(videoId, {}, (err: any, info: { formats: any }) => {
      if (err) {
        console.log(err)
        rej(err)
      }
      let audioFormats = ytdl.filterFormats(info.formats, "audioonly")
      const audioUrl = audioFormats[0].url
      const audioInfo = {
        // thumbnailUrl: info.thumbnail_url,
        thumbnailUrl: "",
        audioUrl: audioUrl,
      }
      res(audioUrl)
    })
  })
}
