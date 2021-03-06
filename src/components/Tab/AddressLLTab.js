import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import ItemPhoneBook from "../Room/ItemPhoneBook";
import { useSelector } from "react-redux";
import call from "react-native-phone-call";
import { Feather } from "@expo/vector-icons";
const AddressLLScreen = ({ navigation }) => {
  const [phone, setphone] = useState([]);
  const [arrayMess, setArrayMess] = useState([]);
  const [icon, seticon] = useState(false);
  const [resultListUser, setResultListUser] = useState(true);
  const [resultUser, setResultUser] = useState(false);
  const [enteredName, setEnterName] = useState("");
  const [user, setUser] = useState([]);
  const userAfterLoginRedux = useSelector((state) => state.user.user.user);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        setphone(data);
        // console.log("====================================");
        // console.log(data[0].phoneNumbers[0].number);
        // console.log("====================================");
      }
    })();
  }, []);
  // const triggerCall = () => {
  //   const args = {
  //     number: phone.phoneNumbers[0].number,
  //     prompt: true,
  //   };
  //   call(args).catch(console.error);
  // };
  return (
    // <View style={styles.container}>
    //   <ScrollView>
    //     {phone.map((data) => {
    //       return (
    //         <View key={data.id}>
    //           <Text>
    //             {data.name}
    //           </Text>
    //           {/* <Text>{phone.phoneNumber[0].number}</Text> */}
    //         </View>
    //       );
    //     })}
    //   </ScrollView>
    // </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.con}>
        {/* <View style={styles.con2}>
          <View style={styles.container}>
            <View style={styles.maincontainer}>
              <TextInput
                placeholder="Nh???p t??n b???n b?? c???n t??m "
                value={enteredName}
                onChangeText={(text) => {
                  setEnterName(text);
                  seticon(text == null ? false : true);
                }}
                style={styles.textinputt}
              />
              {icon && (
                <AntDesign
                  style={styles.iconn}
                  name="closecircle"
                  size={24}
                  color="#2089dc"
                  onPress={() => {
                    seticon(false);
                    setEnterName(null);
                    setResultListUser(true);
                    setResultUser(false);
                  }}
                />
              )}
            </View>
            <View style={styles.buttonsend}>
              <Button title="T??m" />
            </View>
          </View>
        </View> */}
        <View style={styles.b2}>
          <Text style={styles.text}>Danh b??? ng?????i d??ng</Text>
        </View>
        <View style={styles.b3}>
          <ScrollView>
            {phone.map((data) => {
              return (
                // <View key={data.id}>
                //   <Text>{data.name}</Text>
                //   {/* <Text>{phone.phoneNumber[0].number}</Text> */}
                // </View>
                <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate("Call", {
                  //     phonenum: data.phoneNumbers[0].number,
                  //   })
                  // }
                  onPress={() => {
                    call({
                      number: data.phoneNumbers[0].number,
                      prompt: true,
                    }).catch(console.error);
                  }}
                  key={data.id}
                >
                  <View style={styles.containerrr}>
                    <View style={styles.leftContainer}>
                      <Image
                        source={require("../../images/a.jpg")}
                        // source={{uri : userAfterLoginRedux.avatar}}
                        style={styles.avatarrr}
                      />
                      <View style={styles.cenContainer}>
                        <Text numberOfLines={1} style={styles.usernameee}>
                          {data.name}
                        </Text>
                      </View>
                      {/* 
                      <Feather
                        style={styles.aa}
                        name="phone-call"
                        size={24}
                        color="#00e64d"
                      /> */}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default AddressLLScreen;
const styles = StyleSheet.create({
  con: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "14%",
    alignItems: "center",
  },
  b1: {
    backgroundColor: "#fff",
    marginLeft: 10,
    width: "35%",
    backgroundColor: "#fff",
    height: "6%",
  },
  b2: {
    backgroundColor: "#fff",
    marginTop: "2%",
    height: "5%",
    width: "100%",
  },
  b3: {
    height: "75%",
    flex: 1,
    padding: 10,
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
  time: {
    fontSize: 16,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
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

  text: {
    fontWeight: "bold",
    color: "#2089dc",
    fontSize: 16,
    marginLeft: 20,
  },
  button: {
    width: 150,
  },
  leftContainerr: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    padding: 30,
  },
  usernamee: {
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  cenContainerr: {
    paddingRight: 25,
    marginLeft: 10,
    flex: 1,
  },
  avatarr: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  maincontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: "5%",
    flex: 1,
    alignItems: "center",
    borderColor: "#2089dc",
    borderWidth: 1,
    width: "80%",
  },
  textinputt: {
    flex: 1,
    marginHorizontal: 10,
  },
  iconn: {
    marginHorizontal: 10,
  },
  buttonsend: {
    backgroundColor: "#2089dc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  },
  containerrr: {
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
  avatarrr: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  cenContainer: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  usernameee: {
    fontWeight: "bold",
    fontSize: 16,
  },
  aa: {
    marginLeft: 50,
  },
});
