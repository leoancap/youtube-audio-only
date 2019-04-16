import { observer } from "mobx-react-lite";
import * as React from "react";
import { Text, View } from "react-native";
import { RootStoreContext } from "../stores/RootStore";

interface Props {}

export const PlayerScreen: React.FC<Props> = observer(() => {
  const { routerStore } = React.useContext(RootStoreContext);
  return (
    <View>
      <Text>Workhhhhhhhhout history page</Text>
    </View>
  );
});
