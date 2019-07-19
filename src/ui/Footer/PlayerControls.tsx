import * as React from "react"
import { View, Text } from "native-base"
import { observer } from "mobx-react-lite"
import { Animated } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import VideoPlayer from "react-native-video"
import { Slider } from "react-native-elements"

import { PlayerFooterAnimated } from "./PlayerModal"
import { secToHHMMSS } from "../../utils/searchOptimized"
import { ui } from "../../utils/UI"
import { SCREEN_HEIGHT, styles, playerModalPosition } from "./shared"
import { RootStoreContext } from "../../stores/RootStore"

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
)

const animatedBackgroundColor = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 150, SCREEN_HEIGHT - 70],
  outputRange: ["yellow", "transparent"],
  extrapolate: "clamp",
})
const animatedSliderBottomPosition = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 150, SCREEN_HEIGHT - 70],
  outputRange: [130, 70],
  extrapolate: "clamp",
})
const animatedTitleOpacity = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 150, SCREEN_HEIGHT - 70],
  outputRange: [1, 0],
  extrapolate: "clamp",
})
const animatedTitleBottom = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 190, SCREEN_HEIGHT - 90],
  outputRange: [180, 90],
  extrapolate: "clamp",
})

const animatedSliderHorizontalPosition = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 150, SCREEN_HEIGHT - 70],
  outputRange: [30, 0],
  extrapolate: "clamp",
})

const animatedTitle = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 300, SCREEN_HEIGHT - 250],
  outputRange: [70, 30],
  extrapolate: "clamp",
})

const animatedControlPosition = playerModalPosition.y.interpolate({
  inputRange: [SCREEN_HEIGHT - 150, SCREEN_HEIGHT - 70],
  outputRange: [60, 15],
  extrapolate: "clamp",
})

export const PlayerFooter: React.FC<{}> = observer(() => {
  const {
    playerStore,
    landingStore: { sliderFocused, toggleSliderFocused },
  } = React.useContext(RootStoreContext)
  const player = React.useRef(null)

  const {
    currentSong,
    rate,
    playbackState,
    currentTime,
    setCurrentTime,
    pause,
    resume,
    handleOnEnd,
  } = playerStore

  if (!currentSong) {
    return null
  }

  return (
    <PlayerFooterAnimated>
      <VideoPlayer
        source={{ uri: currentSong.audioUrl }}
        style={styles.player}
        rate={rate}
        playInBackground
        paused={playbackState === "paused"}
        ref={player}
        onProgress={(data) => {
          if (!sliderFocused) {
            setCurrentTime(data.currentTime)
          }
        }}
        onEnd={handleOnEnd}
      />
      <Animated.View
        style={[
          {
            opacity: animatedTitleOpacity,
            bottom: animatedTitleBottom,
            justifyContent: "center",
            marginLeft: 20,
            marginRight: 20,
          },
          styles.line,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginRight: 20,
              paddingRight: 20,
            }}
          >
            {iconSorter("minus", () => {
              console.log(playerStore.queue)
            })}
          </View>
          <Text
            style={{
              color: "lightgray",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 18,
            }}
          >
            {currentSong.title}
          </Text>
          <View
            style={{
              marginLeft: 20,
              paddingLeft: 20,
            }}
          >
            {iconSorter("plus", () => {
              console.log(playerStore.queue)
            })}
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          {
            left: animatedSliderHorizontalPosition,
            right: animatedSliderHorizontalPosition,
            bottom: animatedSliderBottomPosition,
            backgroundColor: animatedBackgroundColor,
          },
          styles.line,
        ]}
      >
        <Slider
          value={currentTime}
          maximumValue={currentSong.seconds}
          minimumValue={0}
          minimumTrackTintColor={ui.color5.color}
          thumbTintColor={ui.color5.color}
          onSlidingStart={toggleSliderFocused}
          thumbStyle={sliderFocused ? { transform: [{ scale: 1.25 }] } : {}}
          maximumTrackTintColor="transparent"
          onSlidingComplete={(value) => {
            // @ts-ignore
            player.current!.seek(value, 3000)
            toggleSliderFocused()
          }}
          onValueChange={(value) => {
            setCurrentTime(value)
          }}
          trackStyle={styles.trackStyle}
        />
      </Animated.View>
      <Animated.View
        style={[{ bottom: animatedControlPosition }, styles.controlButtons]}
      >
        <Text style={[styles.durationText, ui.color1]}>
          {currentTime > 0
            ? secToHHMMSS(currentTime + 1, currentSong.duration)
            : secToHHMMSS(0, currentSong.duration)}
        </Text>
        {iconSorter("step-backward", () => {})}
        {playbackState === "playing" &&
          iconSorter("pause", () => {
            pause()
          })}
        {playbackState === "paused" &&
          iconSorter("play", () => {
            resume()
          })}
        {iconSorter("step-forward", () => {
          console.log(playerStore.queue)
        })}
        <Text style={[styles.durationText, ui.color1]}>
          {currentSong.duration}
        </Text>
      </Animated.View>
    </PlayerFooterAnimated>
  )
})
