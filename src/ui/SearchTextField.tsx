import { observer } from "mobx-react-lite"
import { View, Text } from "native-base"
import * as React from "react"
import { StyleSheet } from "react-native"
import { SearchBar } from "react-native-elements"
import { RootStoreContext } from "../stores/RootStore"
import { ui } from "../utils/UI"
import { search } from "../utils/searchOptimized"
import { fromPromise } from "mobx-utils"
import { Toolbar } from "react-native-material-ui"
import { Header } from "./Header/Header"

interface Props {}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 0,
  },
  searchBar: {},
  appTitle: {
    fontSize: 22,
    // fontFamily: "serif",
    ...ui.color1,
  },
})

export const SearchTextField: React.FC<Props> = observer(() => {
  const { searchStore } = React.useContext(RootStoreContext)

  return <Header />

  // return (
  //   <Toolbar
  //     leftElement="menu"
  //     centerElement={<Text style={styles.appTitle}>Stremify</Text>}
  //     style={{
  //       container: [styles.container, ui.bg1],
  //       leftElementContainer: [styles.searchBar],
  //       rightElementContainer: [styles.searchBar],
  //       centerElementContainer: [styles.searchBar],
  //       leftElement: [ui.color1],
  //       rightElement: [ui.color1],
  //     }}
  //     searchable={{
  //       autoFocus: true,
  //       placeholder: "Search",
  //       onChangeText: text => {
  //         searchStore.setSearchText(text);
  //       },
  //     }}
  //     searchValue={searchStore.term}
  //     rightElement={{
  //       menu: {
  //         icon: "more-vert",
  //         labels: ["item 1", "item 2"],
  //       },
  //     }}
  //     onRightElementPress={label => {
  //       console.log(label);
  //     }}
  //   />
  // );
})
