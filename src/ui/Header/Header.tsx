import * as React from "react"
import { observer } from "mobx-react-lite"
import { Text, View } from "native-base"
import { RootStoreContext } from "../../stores/RootStore"

import { StyleSheet, TextInput, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"

import * as Animatable from "react-native-animatable"
import { ui } from "../../utils/UI"
import { CustomDrawer } from "./Drawer"

interface Props {}

export const Header: React.FC<Props> = observer(() => {
  const {
    searchStore: {
      toggleDrawer,
      setSearchText,
      term,
      searchFocused,
      toggleSearchFocused,
    },
  } = React.useContext(RootStoreContext)

  return (
    <View>
      <CustomDrawer />
      {searchFocused ? (
        <View style={[styles.searchBarContainer, ui.bg2]}>
          <Animatable.View
            animation="lightSpeedIn"
            duration={500}
            style={[styles.searchAnimatedContainer, ui.bg3]}
          >
            <Animatable.View animation="fadeInRight" duration={400}>
              <Ionicons
                onPress={toggleSearchFocused}
                name="md-arrow-back"
                style={styles.searchIcon}
              />
            </Animatable.View>
            <TextInput
              placeholder="Search"
              autoFocus
              placeholderTextColor={ui.color2.color}
              style={styles.textInput}
              onChangeText={setSearchText}
              value={term}
            />
            <Ionicons
              onPress={() => setSearchText("")}
              name="md-close"
              style={styles.clearTextIcon}
            />
          </Animatable.View>
        </View>
      ) : (
        <View style={[styles.container, ui.bg2]}>
          <View style={styles.section}>
            <Ionicons
              onPress={toggleDrawer}
              name="md-menu"
              style={styles.burgerIcon}
            />
            <Text style={styles.appTitle}>Streamify</Text>
          </View>
          <View style={styles.section}>
            <Ionicons
              onPress={toggleSearchFocused}
              name="ios-search"
              style={styles.searchIcon}
            />
            <Entypo
              onPress={toggleSearchFocused}
              name="dots-three-vertical"
              style={styles.dots}
            />
          </View>
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  section: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  dots: {
    fontSize: 22,
    marginLeft: 15,
    ...ui.color1,
  },
  burgerIcon: {
    fontSize: 22,
    paddingHorizontal: 10,
    ...ui.color1,
  },
  appTitle: {
    fontSize: 18,
    paddingHorizontal: 10,
    ...ui.color1,
  },
  searchBarContainer: {},
  searchIcon: {
    fontSize: 22,
    // paddingHorizontal: 10,
    ...ui.color1,
  },
  clearTextIcon: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 3,
    ...ui.color1,
  },
  searchAnimatedContainer: {
    color: "white",
    paddingHorizontal: 20,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  textInput: {
    fontSize: 19,
    marginLeft: 15,
    width: "84.5%",
    ...ui.color1,
  },
})
