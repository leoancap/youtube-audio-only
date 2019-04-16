import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { App } from "./src/App";

// disable warnings
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
