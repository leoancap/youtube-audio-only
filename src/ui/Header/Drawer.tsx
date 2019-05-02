import * as React from "react"
import { Text, View, Drawer, Container } from "native-base"
import * as Animatable from "react-native-animatable"

interface Props {}

export const CustomDrawer: React.FC<Props> = observer(() => {
  const {
    searchStore: { toggleDrawer, drawerOpen },
  } = React.useContext(RootStoreContext)
  return (
    <Modal visible={drawerOpen} transparent={true}>
      <TouchableHighlight onPress={toggleDrawer} style={styles.drawer}>
        <Animatable.View
          style={styles.menus}
          animation="fadeInLeft"
          duration={500}
        >
          <Text>codo</Text>
          <Text>codo</Text>
          <Text>codo</Text>
        </Animatable.View>
      </TouchableHighlight>
    </Modal>
  )
})

import {
  StyleSheet,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from "react-native"
import { ui } from "../../utils/UI"
import { observer } from "mobx-react-lite"
import { RootStoreContext } from "../../stores/RootStore"
const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  menus: {
    backgroundColor: "blue",
    width: "60%",
    height: "100%",
    position: "absolute",
  },
})
