import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ui } from "../utils/UI";
import { RootStoreContext } from "../stores/RootStore";
import { Video } from "../stores/PlayerStore";
import { LandingStore } from "../stores/LandingStore";

interface Props {
  video: Video;
  onVideoPress: () => void;
  onAddToQueue: () => void;
}

export const SoundItem: React.FC<Props> = observer(
  ({ video, onVideoPress }) => {
    const { landingStore } = React.useContext(RootStoreContext);

    const { title, duration } = video;

    const handleOpenFab = (e: { nativeEvent: { pageY: number } }) =>
      landingStore.openFab(e, video);

    return (
      <View style={[styles.cardContainer, ui.bg2]}>
        <TouchableOpacity
          onPress={onVideoPress}
          style={styles.musicTitleWrapper}
        >
          <Text numberOfLines={1} style={[styles.musicTitle, ui.color1]}>
            {title}
          </Text>
          {duration ? (
            <Text style={[styles.musicDuration, ui.color2]}>{duration}</Text>
          ) : (
            <Text style={[styles.musicDuration, ui.color5]}>n/a</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenFab} style={styles.circleWrapper}>
          <View style={styles.circle}>
            <View style={styles.circleText} />
            <View style={styles.circleText} />
            <View style={styles.circleText} />
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: ui.bg1.backgroundColor,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 2,
    // paddingHorizontal: 50,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  musicTitleWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  musicTitle: {
    fontSize: 17,
  },
  musicDuration: {
    fontSize: 16,
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    minHeight: 70,
  },
  circle: {
    flexDirection: "column",
  },
  circleText: {
    backgroundColor: "#9c9c9c",
    width: 4,
    height: 4,
    marginBottom: 5,
    borderRadius: 20,
  },
});
