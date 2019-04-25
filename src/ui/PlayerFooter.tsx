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
  <TouchableOpacity>
    <Icon.Button
      style={
        {
          // borderRadius: 500,
          // borderWidth: 1,
          // borderColor: "fff",
        }
      }
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
  </TouchableOpacity>
);

export const PlayerFooter: React.FC<Props> = observer(() => {
  const { playerStore } = React.useContext(RootStoreContext);
  const player = React.useRef(null);
  const [sliderFocused, setSliderFocused] = React.useState(false);

  return (
    // <View style={[styles.container, ui.bg3]}>

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
        // rate={playerStore.rate}
        paused={playerStore.playbackState === "paused"}
        ref={player}
      />
      <View style={[styles.line]}>
        <Slider
          // value={playerStore.currentSeconds}
          value={30}
          // maximumValue={playerStore.currentSong.seconds}
          maximumValue={388}
          minimumValue={0}
          minimumTrackTintColor={ui.color5.color}
          thumbTintColor={ui.color5.color}
          onSlidingStart={() => setSliderFocused(true)}
          thumbStyle={sliderFocused ? { transform: [{ scale: 1.25 }] } : {}}
          maximumTrackTintColor="transparent"
          onSlidingComplete={value => {
            // playerStore.setCurrentTime(value);
            setSliderFocused(false);
          }}
          trackStyle={styles.trackStyle}
        />
      </View>
      {/* <View style={styles.durationWrapper}>
        <Text style={[styles.durationText, ui.color1]}>0:02</Text>
        <Text style={[styles.durationText, ui.color1]}>1:12:30</Text>
      </View> */}
      <View style={styles.controlButtons}>
        <Text style={[styles.durationText, ui.color1]}>0:02</Text>
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
        <Text style={[styles.durationText, ui.color1]}>1:12:30</Text>
      </View>
    </LinearGradient>
    // </View>
  );
});
