import { observer } from "mobx-react-lite";
import { Container } from "native-base";
import * as React from "react";
import { RootStoreContext } from "../stores/RootStore";
import { PlayerFooter } from "../ui/PlayerFooter";
import { ui } from "../utils/UI";
import { SearchTextField } from "../ui/SearchTextField";
import { ResultsList } from "../ui/ResultsList";
import { FabSongItem } from "../ui/FabSongItem";

interface Props {}

export const ListingScreen: React.FC<Props> = observer(() => {
  const {
    playerStore,
    landingStore: { sliderFocused, toggleSliderFocused },
  } = React.useContext(RootStoreContext);
  return (
    <Container style={[ui.bg2]}>
      <SearchTextField />
      <FabSongItem />
      <ResultsList />
      <PlayerFooter />
    </Container>
  );
});
