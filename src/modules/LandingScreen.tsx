import { observer } from "mobx-react-lite"
import { Container } from "native-base"
import * as React from "react"
import { ui } from "../utils/UI"
import { SearchTextField } from "../ui/SearchTextField"
import { ResultsList } from "../ui/ResultsList"
import { FabSongItem } from "../ui/FabSongItem"
import { Animated, Dimensions } from "react-native"
import { PlayerFooter } from "../ui/Footer/PlayerControls"

const SCREEN_HEIGHT = Dimensions.get("window").height
const animation = new Animated.Value(0)

const translateY = animation.interpolate({
  inputRange: [0, 1],
  outputRange: [SCREEN_HEIGHT, 0],
})

interface Props {}

export const ListingScreen: React.FC<Props> = observer(() => {
  return (
    <Container style={[ui.bg2]}>
      <SearchTextField />
      <FabSongItem />
      <ResultsList />
      <Animated.View style={{ transfrom: [{ translateY }] }}>
        <PlayerFooter />
      </Animated.View>
    </Container>
  )
})
