import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Navigator";
import { Provider } from "react-redux";
import store from "../redux/store";

const AppModule = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
};

export default AppModule;
