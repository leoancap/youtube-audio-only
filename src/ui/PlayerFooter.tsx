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
import { parseDuration, secToHHMMSS } from "../utils/searchOptimized";

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
  const { playerStore } = React.useContext(RootStoreContext);
  const player = React.useRef(null);
  const [sliderFocused, setSliderFocused] = React.useState(false);

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
        source={{ uri: playerStore.currentSong.audioUrl }}
        style={styles.player}
        rate={playerStore.rate}
        paused={playerStore.playbackState === "paused"}
        ref={player}
        onProgress={data => {
          if (!sliderFocused) {
            playerStore.currentTime = data.currentTime;
          }
        }}
      />
      <View style={[styles.line]}>
        <Slider
          value={playerStore.currentTime}
          maximumValue={playerStore.currentSong.seconds}
          minimumValue={0}
          minimumTrackTintColor={ui.color5.color}
          thumbTintColor={ui.color5.color}
          onSlidingStart={() => setSliderFocused(true)}
          thumbStyle={sliderFocused ? { transform: [{ scale: 1.25 }] } : {}}
          maximumTrackTintColor="transparent"
          onSlidingComplete={value => {
            // @ts-ignore
            player.current!.seek(value, 3000);
            setSliderFocused(false);
          }}
          onValueChange={value => {
            playerStore.currentTime = value;
          }}
          trackStyle={styles.trackStyle}
        />
      </View>
      <View style={styles.controlButtons}>
        <Text style={[styles.durationText, ui.color1]}>
          {playerStore.currentTime > 0
            ? secToHHMMSS(
                playerStore.currentTime + 1,
                playerStore.currentSong.duration,
              )
            : secToHHMMSS(0, playerStore.currentSong.duration)}
        </Text>
        {iconSorter("step-backward", () => {
          // console.log(playerStore.currentSong);
          // playerStore.currentSong.setCurrentTime(455);
        })}
        {playerStore.playbackState === "playing" &&
          iconSorter("pause", () => {
            playerStore.pause();
          })}
        {playerStore.playbackState === "paused" &&
          iconSorter("play", () => {
            playerStore.resume();
          })}
        {iconSorter("step-forward", () => {
          console.log(player);
        })}
        <Text style={[styles.durationText, ui.color1]}>
          {playerStore.currentSong.duration}
        </Text>
      </View>
    </LinearGradient>
    // </View>
  );
});
