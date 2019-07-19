import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ui } from "../utils/UI"
import { RootStoreContext } from "../stores/RootStore"
import { Video } from "../stores/PlayerStore"

interface Props {
  video: Video
  onVideoPress: () => void
  isDark: boolean
}

export const SoundItem: React.FC<Props> = observer(
  ({ video, onVideoPress, isDark }) => {
    const { landingStore } = React.useContext(RootStoreContext)

    const { title, duration } = video

    const handleOpenFab = (e: { nativeEvent: { pageY: number } }) =>
      landingStore.openFab(e, video)

    return (
      <View style={[styles.cardContainer, isDark ? ui.bg2 : ui.bg1]}>
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
    )
  },
)

const styles = StyleSheet.create({
  cardContainer: {
    // borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: ui.bg1.backgroundColor,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 75,
    paddingHorizontal: 18,
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
    paddingHorizontal: 5,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  circle: {
    flexDirection: "column",
  },
  circleText: {
    backgroundColor: ui.color1.color,
    width: 4,
    height: 4,
    marginBottom: 3,
    borderRadius: 2,
  },
})
