import AppModule from "./src/modules/AppModule";
import 'expo-dev-client';
import { MMKV } from "react-native-mmkv"
import store from "./src/redux/store";


export default AppModule;


export const mmkv = new MMKV();

const savedState = mmkv.getString('redux-state');
if (savedState) {
  store.dispatch({ type: 'LOAD_STATE', payload: savedState });
}