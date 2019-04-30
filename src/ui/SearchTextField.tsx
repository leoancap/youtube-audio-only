import { observer } from "mobx-react-lite";
import { View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { RootStoreContext } from "../stores/RootStore";
import { ui } from "../utils/UI";
import { search } from "../utils/searchOptimized";
import { fromPromise } from "mobx-utils";

interface Props {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  inputStyle: {
    fontSize: 16,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 80,
    height: 40,
  },
  searchIcon: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 9,
    height: 40,
  },
  cancelIcon: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    flex: 9,
  },
  goText: {
    fontSize: 18,
    color: "#bbb",
  },
});

export const SearchTextField: React.FC<Props> = observer(() => {
  const { searchStore } = React.useContext(RootStoreContext);

  return (
    <View style={[styles.searchBar, ui.bg2]}>
      <SearchBar
        containerStyle={[styles.searchBar, ui.bg2]}
        inputStyle={[styles.inputStyle, ui.bg1]}
        leftIconContainerStyle={[styles.searchIcon, ui.bg1]}
        rightIconContainerStyle={[styles.cancelIcon, ui.bg1]}
        lightTheme={false}
        round={true}
        placeholder="Search Here..."
        onChangeText={text => {
          searchStore.setSearchText(text);
        }}
        onClear={() => {
          searchStore.setSearchText("");
        }}
        value={searchStore.term}
      />
    </View>
  );
});
