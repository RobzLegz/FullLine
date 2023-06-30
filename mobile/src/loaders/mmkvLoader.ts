import { MMKV } from 'react-native-mmkv';
import store from '../redux/store';

export const mmkv = new MMKV();

const loadStateFromMMKV = () => {
  const savedState = mmkv.getString('redux-state');
  if (savedState) {
    store.dispatch({ type: 'LOAD_STATE', payload: savedState });
  }
};

export default loadStateFromMMKV;