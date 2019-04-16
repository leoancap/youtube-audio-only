import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ui } from "../utils/UI";

interface Props {
  title: string;
  videoId: string;
  duration: string;
  onVideoPress: () => void;
  isFabOpen: boolean;
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    borderTopWidth: 2,
    borderTopColor: ui.bg1.backgroundColor,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 2,
    // paddingHorizontal: 50,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  musicTitleWrapper: {
    // padding: 10,

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
    width: "20%",
    minHeight: 70,
    // backgroundColor: "white",
  },
  circle: {
    flexDirection: "column",
  },
  circleText: {
    backgroundColor: "#9c9c9c",
    width: 4,
    height: 4,
    marginBottom: 5,
    borderRadius: 20,
  },
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

export const SongCard: React.FC<Props> = observer(
  ({ duration, onVideoPress, title, isFabOpen }) => {
    const [fabPosition, setFabPosition] = React.useState("");
    const [isFabVisible, setIsFabVisible] = React.useState(false);

    const circlesRef = React.useRef(null);

    console.log(fabPosition);
    return (
      <View ref={circlesRef} style={[styles.cardContainer, ui.bg2]}>
        <TouchableOpacity
          onPress={e => {
            const { width } = Dimensions.get("window");
            const perc = e.nativeEvent.locationX / width;
            console.log(perc);
            onVideoPress();
          }}
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
        <TouchableOpacity
          onPress={e => {
            const { height } = Dimensions.get("window");
            const perc = e.nativeEvent.pageY / height;
            setFabPosition((perc * 100).toFixed(2) + "%");
            setIsFabVisible(true);
          }}
          style={styles.circleWrapper}
        >
          <View onLayout={e => {}}>
            <TouchableOpacity style={styles.circle}>
              <View style={styles.circleText} />
              <View style={styles.circleText} />
              <View style={styles.circleText} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* {isFabVisible ? (
          <FabSongCard
            fabPosition={fabPosition}
            closeFab={() => {
              setIsFabVisible(false);
            }}
          />
        ) : null} */}
        <Modal visible={isFabVisible} transparent={true}>
          <TouchableHighlight
            onPressIn={() => {
              setIsFabVisible(false);
            }}
            style={[styles.fabContainer]}
          >
            <View
              style={[styles.fabSubContainer, ui.bg1, { top: fabPosition }]}
            >
              <TouchableOpacity>
                <Text
                  style={[styles.buttonsText, ui.color1, { borderTopWidth: 0 }]}
                >
                  Play Next
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.buttonsText, ui.color1]}>
                  Add to Queue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.buttonsText, ui.color1]}>
                  Save to Playlist
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  },
);
