import { Dimensions, Animated, StyleSheet } from "react-native"

export const SCREEN_HEIGHT = Dimensions.get("window").height
export const maxBound = SCREEN_HEIGHT * 0.25
export const minBound = SCREEN_HEIGHT - 70
export const SWIPE_THRESHOLD = 0.6 * SCREEN_HEIGHT

export const playerModalPosition = new Animated.ValueXY({
  x: 0,
  y: SCREEN_HEIGHT - 70,
})

export const styles = StyleSheet.create({
  animatedStyle: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    // zIndex: 10,
    height: SCREEN_HEIGHT,
  },

  container: {
    width: "100%",
    // ...ui.bg3,
  },
  linearGradient: {
    flex: 1,
    height: "100%",
  },
  player: {
    height: 0,
    backgroundColor: "white",
  },
  line: {
    position: "absolute",
    // bottom: 70,
    // left: 0,
    // rigth: 0,
    height: 1,
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  trackStyle: {
    height: 1,
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
    marginTop: 15,
    // marginBottom: 200,
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
  },
})
