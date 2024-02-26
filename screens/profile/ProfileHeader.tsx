import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileHeader = ({ userName, accountBalance }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "path_to_profile_image" }}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.accountBalance}>{accountBalance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  accountBalance: {
    fontSize: 18,
    color: "grey",
  },
});

export default ProfileHeader;
