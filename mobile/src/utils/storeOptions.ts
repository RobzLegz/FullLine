import * as SecureStore from "expo-secure-store";

export const saveItem = async (
  key: string,
  value: string | number | object | string[] | number[] | object[]
) => {
  const saveItem = JSON.stringify(value).replace(" ", "")
  await SecureStore.setItemAsync(key, saveItem);
};

export const getItemFromStore = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    return null;
  }

  return result;
};

export const removeItemFromStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
