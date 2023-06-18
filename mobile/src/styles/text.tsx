import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { black, white } from "../constants/colors";

export const Small = memo((props: any) => {
  return (
    <Text
      style={props.style ? { ...styles.small, ...props.style } : styles.small}
    >
      {props.children}
    </Text>
  );
});

export const P = memo((props: any) => {
  return (
    <Text style={props.style ? { ...styles.p, ...props.style } : styles.p}>
      {props.children}
    </Text>
  );
});

export const Strong = memo((props: any) => {
  return (
    <Text
      style={props.style ? { ...styles.strong, ...props.style } : styles.strong}
    >
      {props.children}
    </Text>
  );
});

export const H3 = memo((props: any) => {
  return (
    <Text style={props.style ? { ...styles.h3, ...props.style } : styles.h3}>
      {props.children}
    </Text>
  );
});

export const H1 = memo((props: any) => {
  return (
    <Text style={props.style ? { ...styles.h1, ...props.style } : styles.h1}>
      {props.children}
    </Text>
  );
});

const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    fontFamily: "Roboto_400Regular",
    color: white,
  },
  p: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    color: white,
  },
  strong: {
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
    color: white,
  },
  h3: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: white,
  },
  h1: {
    fontSize: 28,
    fontFamily: "Roboto_700Bold",
    color: white,
  },
});
