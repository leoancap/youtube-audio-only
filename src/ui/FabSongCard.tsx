import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { ui } from "../utils/UI";

interface Props {
  fabPosition: string;
  closeFab: () => void;
}

const styles = StyleSheet.create({
  fabContainer: {
    // left: "55%",
    // top: "55%",
    // maxWidth: "40%",
    // width: "auto",
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  fabSubContainer: {
    width: "auto",
    maxWidth: "40%",
    left: "50%",
    borderRadius: 15,
    paddingVertical: 0,
  },
  buttonsText: {
    paddingVertical: 10,
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 16,
    borderTopWidth: 1,
    borderTopColor: ui.bg3.backgroundColor,
  },
});

export const FabSongCard: React.FC<Props> = observer(
  ({ fabPosition, closeFab }) => {
    return (
      <Modal visible={true} transparent={true}>
        <TouchableHighlight onPressIn={closeFab} style={[styles.fabContainer]}>
          <View style={[styles.fabSubContainer, ui.bg1, { top: fabPosition }]}>
            <TouchableOpacity>
              <Text
                style={[styles.buttonsText, ui.color1, { borderTopWidth: 0 }]}
              >
                Play Next
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
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
    );
  },
);
