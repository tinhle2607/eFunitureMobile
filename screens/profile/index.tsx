import React from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import ProfileHeader from "./ProfileHeader";
import HorizontalMenu from "./HorizontalMenu";
import VerticalMenu from "./VerticalMenu";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <ProfileHeader userName="Clara Alverina" accountBalance="1,232 Points" />
      <HorizontalMenu />

      <VerticalMenu />
      {/* Other components or logic */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ProfileScreen;
