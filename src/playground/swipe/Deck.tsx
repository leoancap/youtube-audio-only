// import * as React from "react"
// import { View, Text } from "native-base"
// import {
//   Dimensions,
//   PanResponder,
//   Animated,
//   UIManager,
//   LayoutAnimation,
// } from "react-native"

// const SCREEN_WIDTH = Dimensions.get("window").width
// const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
// const SWIPE_OUT_DURATION = 250
// const position = new Animated.ValueXY()

// const renderCards = (data: any, renderCard: any) => {
//   const [index, setIndex] = React.useState(0)
//   React.useEffect(() => {
//     UIManager.setLayoutAnimationEnabledExperimental &&
//       UIManager.setLayoutAnimationEnabledExperimental(true)
//     LayoutAnimation.spring()
//   })

//   if (data.length === index)
//     return (
//       <View>
//         <Text>no more cards</Text>
//       </View>
//     )

//   const onSwipeComplete = () => {
//     setIndex(index + 1)
//     position.setValue({ x: 0, y: 0 })
//   }

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (event, gesture) => {
//       position.setValue({ x: gesture.dx, y: gesture.dy })
//     },
//     onPanResponderRelease: (event, gesture) => {
//       if (gesture.dx > SWIPE_THRESHOLD) {
//         forceSwipe(position, "right", onSwipeComplete)
//       } else if (gesture.dx < -SWIPE_THRESHOLD) {
//         forceSwipe(position, "left", onSwipeComplete)
//       } else {
//         resetPosition(position)
//       }
//     },
//   })

//   return data.map((item, i) => {
//     if (i < index) return null
//     if (i === index) {
//       return (
//         <Animated.View
//           key={item.id}
//           style={[
//             getCardStyle(position, SCREEN_WIDTH),
//             styles.cardStyle,
//             { top: 5, xIndex: 99 },
//           ]}
//           {...panResponder.panHandlers}
//         >
//           {renderCard(item)}
//         </Animated.View>
//       )
//     }
//     return (
//       <Animated.View
//         key={item.id}
//         style={[styles.cardStyle, { top: 10 * (i - index) }, { xIndex: 5 }]}
//         // style={getCardStyle(position, SCREEN_WIDTH)}
//         // {...panResponder.panHandlers}
//       >
//         {renderCard(item)}
//       </Animated.View>
//     )
//   })
// }
// export const Deck: any = ({ data, renderCard }: any) => {
//   return <View>{renderCards(data, renderCard)}</View>
// }

// const getCardStyle = (position: Animated.AnimatedValueXY, width: number) => {
//   const rotate = position.x.interpolate({
//     inputRange: [-width * 1.5, 0, width * 1.5],
//     outputRange: ["-120deg", "0deg", "120deg"],
//   })

//   return {
//     ...position.getLayout(),
//     transform: [{ rotate }],
//   }
// }

// const resetPosition = (initialPosition: Animated.AnimatedValueXY) => {
//   Animated.spring(initialPosition, {
//     toValue: { x: 0, y: 0 },
//   }).start()
// }

// const forceSwipe = (
//   initialPosition: Animated.AnimatedValueXY,
//   direction: string,
//   onSwipeComplete: () => void,
// ) => {
//   const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH
//   Animated.timing(initialPosition, {
//     toValue: { x, y: 0 },
//     duration: SWIPE_OUT_DURATION,
//   }).start(onSwipeComplete)
// }

// const styles = {
//   cardStyle: {
//     // position: "absolute",
//     width: SCREEN_WIDTH,
//   },
// }
