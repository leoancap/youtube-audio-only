import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import { Slider, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStoreContext } from "../stores/RootStore";
import { ui } from "../utils/UI";
import LinearGradient from "react-native-linear-gradient";
// import VideoPlayer from "react-native-video"
import VideoPlayer from "react-native-video";
import { parseDuration, secToHHMMSS, search } from "../utils/searchOptimized";
import { fromPromise } from "mobx-utils";
import { PlayerStore } from "../stores/PlayerStore";

interface Props {}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
  },
  player: {
    height: 0,
    backgroundColor: "white",
  },
  line: {
    height: 1,
    justifyContent: "center",
    paddingBottom: 15,
  },
  trackStyle: {
    height: 5,
  },
  durationWrapper: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    // flex: 1,
  },
  durationText: {
    fontSize: 14,
  },
  controlButtons: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
  },
});

const iconSorter = (name: string, onPress: () => void) => (
  <Icon.Button
    iconStyle={{
      paddingLeft: 3,
      marginLeft: 3,
      marginRight: 3,
      marginBottom: 0,
      marginTop: 0,
    }}
    color={ui.color5.color}
    backgroundColor={"transparent"}
    name={name}
    onPress={onPress}
    size={name === "play" || name === "pause" ? 24 : 16}
  />
);

export const PlayerFooter: React.FC<Props> = observer(() => {
  const {
    playerStore,
    landingStore: { sliderFocused, toggleSliderFocused },
  } = React.useContext(RootStoreContext);
  const player = React.useRef(null);

  const {
    currentSong,
    rate,
    playbackState,
    currentTime,
    setCurrentTime,
    pause,
    resume,
    handleOnEnd,
  } = playerStore;

  if (!currentSong) {
    return null;
  }

  return (
    <LinearGradient
      colors={[
        ui.bg3.backgroundColor,
        ui.bg1.backgroundColor,
        ui.bg2.backgroundColor,
      ]}
      style={styles.container}
    >
      <VideoPlayer
        source={{ uri: currentSong.audioUrl }}
        style={styles.player}
        rate={rate}
        paused={playbackState === "paused"}
        ref={player}
        onProgress={data => {
          if (!sliderFocused) {
            setCurrentTime(data.currentTime);
          }
        }}
        onEnd={handleOnEnd}
      />
      <View style={[styles.line]}>
        <Slider
          value={currentTime}
          maximumValue={currentSong.seconds}
          minimumValue={0}
          minimumTrackTintColor={ui.color5.color}
          thumbTintColor={ui.color5.color}
          onSlidingStart={toggleSliderFocused}
          thumbStyle={sliderFocused ? { transform: [{ scale: 1.25 }] } : {}}
          maximumTrackTintColor="transparent"
          onSlidingComplete={value => {
            // @ts-ignore
            player.current!.seek(value, 3000);
            toggleSliderFocused();
          }}
          onValueChange={value => {
            setCurrentTime(value);
          }}
          trackStyle={styles.trackStyle}
        />
      </View>
      <View style={styles.controlButtons}>
        <Text style={[styles.durationText, ui.color1]}>
          {currentTime > 0
            ? secToHHMMSS(currentTime + 1, currentSong.duration)
            : secToHHMMSS(0, currentSong.duration)}
        </Text>
        {iconSorter("step-backward", () => {
          // console.log(currentSong);
          // currentSong.setCurrentTime(455);
        })}
        {playbackState === "playing" &&
          iconSorter("pause", () => {
            pause();
          })}
        {playbackState === "paused" &&
          iconSorter("play", () => {
            resume();
          })}
        {iconSorter("step-forward", () => {
          console.log(playerStore.queue);
        })}
        <Text style={[styles.durationText, ui.color1]}>
          {currentSong.duration}
        </Text>
      </View>
    </LinearGradient>
  );
});
