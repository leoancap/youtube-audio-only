import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListingScreen } from "./modules/LandingScreen";
import { PlayerScreen } from "./modules/PlayerScreen";
import { RootStoreContext } from "./stores/RootStore";

export const Router = observer(() => {
  const { routerStore } = useContext(RootStoreContext);

  return routerStore.screen === "ListingScreen" ? (
    <ListingScreen />
  ) : (
    <PlayerScreen />
  );
});
