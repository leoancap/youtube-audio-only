import { flow, observable, reaction } from "mobx";
import { persist } from "mobx-persist";
import { getAudioUrl } from "../utils/player";
import { search } from "../utils/searchOptimized";
import { RootStore } from "./RootStore";

export interface Video {
  title: string;
  videoId: string;
  duration: string;
  audioUrl?: string;
  thumbnailUrl?: string;
}

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

  @persist("list") @observable youtubeVideos: Video[] = [];
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
      this.rootStore.playerStore.playSound(response.audioUrl);
    } catch (error) {}
  });
}
