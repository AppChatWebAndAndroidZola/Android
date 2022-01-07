import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import addFriendAPI from "../../api/addFriendAPI";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const ItemPhoneBook = (props) => {
  
  console.log(props.data);
  return (
    <ScrollView>
      <Pressable>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image
              source={require("../../images/b.jpg")}
              style={styles.avatar}
            />
            <View style={styles.cenContainer}>
              <Text numberOfLines={1} style={styles.username}>
                {props.name}
              </Text>
            </View>
            <FontAwesome
              style={styles.aa}
              name="circle"
              size={24}
              color={online}
            />
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
};
export default ItemPhoneBook;
const styles = StyleSheet.create({
  con: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "column",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cenContainer: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  time: {
    fontSize: 16,
  },
  aa: {
    marginLeft: 50,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    borderColor: "#a6a6a6",
  },
  icon: {
    position: "absolute",
    marginLeft: "83%",
    marginTop: 15,
  },
  button: {
    width: 100,
    marginLeft: 10,
  },
  on: {
    marginLeft: 150,
  },
});
