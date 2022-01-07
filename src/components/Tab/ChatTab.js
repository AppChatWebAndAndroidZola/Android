import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import ItemRoom from "../Room/ItemRoom";
import roomAPI from "../../api/roomAPI";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useRoute } from "@react-navigation/core";
const ChatTab = ({ navigation }) => {
  const route = useRoute();
  const socket = route.params.socket;
  const loggedInUser =route.params.loggedInUser;
  const token = useSelector((state) => state.user.user.accessToken);
  const [arrayMess, setArrayMess] = useState([]);
  const [icon, seticon] = useState(false);
  useEffect(() => {
    const fetchGetRoomAfterLogin = async () => {
      try {
        const requestGetRoomAfterLogin = await roomAPI.getRoomFriend(token);
        setArrayMess(requestGetRoomAfterLogin.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGetRoomAfterLogin();
  }, []);


  //search room
  const [resultListUser, setResultListUser] = useState(true);
  const [resultUser, setResultUser] = useState(false);
  const [enteredName, setEnterName] = useState("");
  const [user, setUser] = useState([]);
  const searchHandler = async () => {
    const fetchGetUserByPhone = async () => {
      try {
        const getuser = await roomAPI.getRoomByNameFriend(enteredName, token);
        if (getuser.status === 200) {
          setResultUser(true);
          setResultListUser(false);
          setUser(getuser.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUserByPhone();
  };
  //
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("accept-by-me", async (data) => {
        try {
          const requestGetRoomAfterLogin = await roomAPI.getRoomFriend(token);
          setArrayMess(requestGetRoomAfterLogin.data);
          route.params.socket.current.emit(
            "join-room-after-accept-by-me",
            data
          );
        } catch (error) {
          console.log(error);
        }
      });
    }, 100);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on(
        "friend-request-accept-status",
        async (data) => {
          try {
            const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
            setArrayMess(requestGetRoomByFriend.data);
            route.params.socket.current.emit(
              "join-room-after-acceptFriend",
              data
            );
          } catch (error) {
            console.log(error);
          }
        }
      );
    }, 50);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("delete-friend-by-me", async (data) => {
        try {
          console.log("abcd");
          const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
          setArrayMess(requestGetRoomByFriend.data);
        } catch (error) {
          console.log(error);
        }
      });
    }, 15);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("delete-friend", async (data) => {
        try {
          console.log("efgh");
          const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
          setArrayMess(requestGetRoomByFriend.data);
        } catch (error) {
          console.log(error);
        }
      });
    }, 10);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.con}>
        <View style={styles.con2}>
          <View style={styles.container}>
            <View style={styles.maincontainer}>
              <TextInput
                placeholder="Nhập tên bạn bè cần tìm "
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
              <Button onPress={searchHandler} title="Tìm" />
            </View>
          </View>
        </View>
        <View style={styles.b2}>
          <Text style={styles.text}>Danh sách chat</Text>
        </View>
        <View style={styles.b3}>
          {resultListUser && (
            <ScrollView>
              {arrayMess.map((data) => {
                return (
                  <ItemRoom
                    // onReceiveFromRoom={ReceiveFromRoom}
                    key={data._id}
                    data={data}
                    
                    idLogin={loggedInUser}
                    socket={socket}
                  />
                );
              })}
            </ScrollView>
          )}
          {resultUser && (
            <ScrollView>
              {user.map((data) => {
                return (
                  <ItemRoom
                    // onReceiveFromRoom={ReceiveFromRoom}
                    data={data}
                    key={data._id}
                    idLogin={loggedInUser}
                    socket={socket}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatTab;

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
});
