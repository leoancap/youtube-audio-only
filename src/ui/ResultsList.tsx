import * as React from "react";
import { SoundItem } from "./SoundItem";
import { RootStoreContext } from "../stores/RootStore";
import { Video } from "../stores/PlayerStore";
import { observer } from "mobx-react-lite";
import { Container, Text, View } from "native-base";
import { ui } from "../utils/UI";
import { ScrollView } from "react-native";

interface Props {}

export const ResultsList: React.FC<Props> = observer(() => {
  const {
    searchStore: { term, searchPromise },
    playerStore,
  } = React.useContext(RootStoreContext);

  return !term ? (
    <Container style={[ui.bg2]}>
      <Text>Search for something</Text>
    </Container>
  ) : (
    searchPromise.case({
      pending: () => (
        <Container style={[ui.bg2]}>
          <Text>Loading ....</Text>
        </Container>
      ),
      rejected: (err: any) => (
        <Container style={[ui.bg2]}>
          <Text>{err}</Text>
        </Container>
      ),
      fulfilled: (videos: Video[]) => (
        <ScrollView>
          {videos.map((video: Video, i: number) => (
            <SoundItem
              onVideoPress={() => {
                playerStore.fetchAudioUrlAndPlay(video);
              }}
              onAddToQueue={() => {
                playerStore.addToQueue(video);
              }}
              video={video}
              key={video.videoId + video.title + i}
            />
          ))}
        </ScrollView>
      ),
    })
  );
});
