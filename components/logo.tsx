// components/Logo.js

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LogoImages } from "../images";
const Logo = () => {
  return (
    <View style={styles.logoContrainer}>
      <Image source={LogoImages} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContrainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default Logo;
