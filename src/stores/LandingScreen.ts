import { flow, observable, reaction } from "mobx";
import { persist } from "mobx-persist";
import { getAudioUrl } from "../utils/player";
import { search } from "../utils/searchOptimized";
import { Song } from "./PlayerStore";
import { RootStore } from "./RootStore";

const filterVideos = (videos: any) =>
  videos.map((v: any) => ({
    title: v.title,
    videoId: v.videoId,
    duration: v.timestamp,
  }));

export class ListingStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.searchText,
      searchText => {
        if (searchText.length === 0) {
          return;
        }
        this.fetchVideos(searchText);
      },
      {
        delay: 500,
      },
    );
  }

  @persist("list") @observable youtubeVideos: Song[] = [];
  @persist @observable searchText: string;
  @observable loading = "undone";
  @observable errorMsg = "";

  fetchVideos = flow(function*(this: any, searchText: string) {
    this.loading = "pending";
    try {
      const response = yield search(searchText);
      // this.youtubeVideos = filterVideos(response.videos);
      this.youtubeVideos = response;
      this.loading = "done";
    } catch (error) {
      this.loading = "error";
      this.youtubeVideos = [];
      this.errorMsg = error.message;
    }
  });

  fetchAudioUrl = flow(function*(this: ListingStore, videoId: string) {
    try {
      const response = yield getAudioUrl(videoId);
      this.rootStore.playerStore.currentSongUrl = response.audioUrl;
      this.rootStore.playerStore.play(response.audioUrl);
    } catch (error) {}
  });
}
