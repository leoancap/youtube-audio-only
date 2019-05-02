import * as React from "react"
import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  TouchableOpacity,
} from "react-native"

import { StyleSheet } from "react-native"
import { ui } from "../utils/UI"
import { observer } from "mobx-react-lite"
import { RootStoreContext } from "../stores/RootStore"
const styles = StyleSheet.create({
  fabContainer: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  fabSubContainer: {
    maxWidth: "35%",
    left: "52%",
    borderRadius: 5,
    paddingVertical: 0,
  },
  buttonsText: {
    paddingVertical: 10,
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 16,
    // borderTopWidth: 1,
    // borderTopColor: ui.color2.color,
  },
})

interface Props {}

export const FabSongItem: React.FC<Props> = observer(() => {
  const {
    landingStore: { fabPosition, closeFab, itemInFab },
    playerStore: { addToQueue },
  } = React.useContext(RootStoreContext)
  return (
    <Modal visible={fabPosition.length > 0} transparent={true}>
      <TouchableHighlight onPressIn={closeFab} style={[styles.fabContainer]}>
        <View style={[styles.fabSubContainer, ui.bg3, { top: fabPosition }]}>
          <TouchableOpacity>
            <Text
              style={[styles.buttonsText, ui.color1, { borderTopWidth: 0 }]}
            >
              Play Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addToQueue(itemInFab)
            }}
          >
            <Text style={[styles.buttonsText, ui.color1]}>Add to Queue</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.buttonsText, ui.color1]}>
              Save to Playlist
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
    </Modal>
  )
})
