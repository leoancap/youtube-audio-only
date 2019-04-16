import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Slider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ui } from "../utils/UI";

interface Props {}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
  },
  row: {
    paddingHorizontal: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  x: {
    color: "#b2a1a1",
    fontSize: 30,
  },
  timeText: {
    fontSize: 18,
  },
  line: {
    height: 8,
    // backgroundColor: "#738B0D",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    // paddingBottom: 100,
    marginTop: -30,
  },
  trackStyle: {
    height: 4,
  },
});

export const PlayerFooter: React.FC<Props> = ({}) => {
  return (
    <View style={[styles.container, ui.bg3]}>
      {/* <View style={[styles.line, { width: "80%" }]} /> */}
      <View style={[styles.line]}>
        <Slider
          value={50}
          onValueChange={value => {
            console.log(value);
          }}
          trackStyle={styles.trackStyle}
        />
      </View>
      <View style={styles.row}>
        <Icon.Button
          color={ui.color1.color}
          backgroundColor="#063642"
          name="backward"
          onPress={() => {
            console.log("play");
          }}
        />
        <Icon.Button
          backgroundColor="#063642"
          color={ui.color1.color}
          name="stop"
          onPress={() => {
            console.log("play");
          }}
        />
        <Icon.Button
          backgroundColor="#063642"
          name="forward"
          color={ui.color1.color}
          onPress={() => {
            console.log("play");
          }}
        />
      </View>
    </View>
  );
};
