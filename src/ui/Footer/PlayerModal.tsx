import { PanResponder, Animated } from "react-native"
import {
  SCREEN_HEIGHT,
  maxBound,
  minBound,
  SWIPE_THRESHOLD,
  playerModalPosition,
  styles,
} from "./shared"
import React from "react"
import LinearGradient from "react-native-linear-gradient"
import { ui } from "../../utils/UI"

const animatedHeight = {
  transform: playerModalPosition.getTranslateTransform(),
}
const animatedHeaderHeight = playerModalPosition.y.interpolate({
  inputRange: [0, SCREEN_HEIGHT - 70],
  outputRange: [SCREEN_HEIGHT, 70],
  extrapolate: "clamp",
})

const animatedSliderOpacity = playerModalPosition.y.interpolate({
  inputRange: [0, SCREEN_HEIGHT / 3, SCREEN_HEIGHT - 70],
  outputRange: [0, 0, 1],
  extrapolate: "clamp",
})
export const resetPosition = (
  initialPosition: Animated.AnimatedValueXY,
  up: boolean,
) => {
  if (up) {
    // initialPosition.setValue({ x: 0, y: maxBound })
    Animated.timing(initialPosition, {
      toValue: { x: 0, y: maxBound },
      duration: 250,
    }).start()
  } else {
    Animated.timing(initialPosition, {
      toValue: { x: 0, y: minBound },
      duration: 250,
    }).start()
    // initialPosition.setValue({ x: 0, y: minBound })
  }
}
export class PlayerFooterAnimated extends React.Component {
  state = {
    isUp: false,
  }

  setIsUp = (value: boolean) => this.setState({ isUp: value })

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (gesture.moveY < minBound && gesture.moveY > maxBound) {
        if (this.state.isUp) {
          playerModalPosition.setValue({ x: 0, y: maxBound + gesture.dy })
        } else {
          playerModalPosition.setValue({ x: 0, y: gesture.moveY })
        }
      }
    },
    onPanResponderRelease: (event, gesture) => {
      const isInUpperHalf = gesture.moveY < SWIPE_THRESHOLD
      const { setIsUp } = this
      if (isInUpperHalf) {
        if (gesture.vy > 0.91) {
          resetPosition(playerModalPosition, false)
          setIsUp(false)
        } else {
          resetPosition(playerModalPosition, true)
          setIsUp(true)
        }
      } else {
        if (gesture.vy < -0.91) {
          resetPosition(playerModalPosition, true)
          setIsUp(true)
        } else {
          resetPosition(playerModalPosition, false)
          setIsUp(false)
        }
      }
    },
  })
  render() {
    return (
      <Animated.View
        style={[animatedHeight, styles.animatedStyle]}
        {...this.panResponder.panHandlers}
      >
        <Animated.View
          style={[{ height: animatedHeaderHeight }, styles.container]}
        >
          <LinearGradient
            colors={[
              ui.bg3.backgroundColor,
              ui.bg1.backgroundColor,
              ui.bg2.backgroundColor,
            ]}
            style={[styles.linearGradient]}
          >
            {this.props.children}
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    )
  }
}
