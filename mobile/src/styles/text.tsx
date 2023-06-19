import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { black, primary900, white } from "../constants/colors";

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
    color: primary900,
  },
  p: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    color: primary900,
  },
  strong: {
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
    color: primary900,
  },
  h3: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: primary900,
  },
  h1: {
    fontSize: 28,
    fontFamily: "Roboto_700Bold",
    color: primary900,
  },
});
