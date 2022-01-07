import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import roomAPI from "../../api/roomAPI";
import groupAPI from "../../api/groupAPI";
import { useRoute } from "@react-navigation/native";
import { addListUser, removeListUser } from "../../api/listUserSlice";
import userAPI from "../../api/userAPI";
import { AntDesign } from "@expo/vector-icons";
import addFriendAPI from "../../api/addFriendAPI";
const AddFriendIntoGroup = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const userObject = useSelector((state) => state.user.user.user);
  const idLogin = userObject._id;
  const token = useSelector((state) => state.user.user.accessToken);
  const ListUserRedux = useSelector((state) => state.listUser);
  const [icon, seticon] = useState(false);
  const array = [];
  ListUserRedux.listUser.map((user) => {
    array.push(user.id);
  });
  console.log(array);
  const [listUser, setListUser] = useState([]);
  const [addingroup, setaddingroup] = useState(true);
  const [deleteingroup, setdeleteingroup] = useState(false);
  ///Lấy danh sách bạn bè
  const [arrayFriend, setArrayFriend] = useState([]);
  useEffect(() => {
    const fetchGetRoomFriend = async () => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
        setArrayFriend(requestGetRoomByFriend.data);
        // const index1 = route.params.room.users.findIndex(
        //   (x) => x === getuser.data.users[0]._id
        // );

        // for (let index = 0; index < requestGetRoomByFriend.data.length; index++) {
        //   if(requestGetRoomByFriend.data.users[index]._id==

        // }
        // console.log(index1);
        // if (index1 != -1) {
        //   setdeleteingroup(true);
        //   setaddingroup(false);
        // } else {
        //   setdeleteingroup(false);
        //   setaddingroup(true);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetRoomFriend();
  }, []);
  const [alreadyInList, setAlreadyInList] = useState(false);
  //getuserbyname
  const [enteredName, setEnterName] = useState("");
  const [user, setUser] = useState([]);
  const [resultUser, setResultUser] = useState(false);
  const [resultUser1, setResultUser1] = useState(false);
  const [resultListUser, setResultListUser] = useState(true);
  const searchHandler = async () => {
    const fetchGetUserByPhone = async () => {
      try {
        const getuser = await addFriendAPI.GetUserByPhone(enteredName, token);
        if (getuser.status === 200) {
          setResultUser(true);
          setResultListUser(false);
          setUser(getuser.data.users);
          //props.onSendRoomToAddMember
          const index1 = route.params.room.users.findIndex(
            (x) => x === getuser.data.users._id
          );
          if (index1 != -1) {
            setdeleteingroup(false);
            setaddingroup(false);
          } else {
            setdeleteingroup(false);
            setaddingroup(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUserByPhone();
  };

  //add to listuserslice
  const addUserInListHandler = () => {
    const action = addListUser({
      id: user._id,
      name: user.name,
    });
    dispatch(action);
    setListUser(ListUserRedux);
    setaddingroup(false);
    setdeleteingroup(true);
    setResultUser(false);
    setResultUser1(true);
  };
  const addMemberHandler = () => {
    const fetchAddMember = async () => {
      try {
        const addMember = await groupAPI.addMember(
          {
            id: route.params.room._id,
            list_user_id: array,
          },
          token
        );
        if (addMember.status === 200) {
          console.log("Ok con dê");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddMember();
  };
  return (
    <View style={styles.container}>
      <View style={styles.con2}>
        <View style={styles.containerr}>
          <View style={styles.maincontainer}>
            <TextInput
              placeholder="Nhập số điện thoại cần tìm"
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
      <View style={styles.body}>
        {resultUser && (
          <View style={styles.leftContainerr}>
            <Image
              source={require("../../images/b.jpg")}
              style={styles.avatar}
            />
            <View style={styles.cenContainer}>
              <Text style={styles.usernamee}>{user.name}</Text>
            </View>
            <Button title="Thêm" onPress={addUserInListHandler} />
          </View>
        )}
      </View>
      <View style={styles.body1}>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
        />
        {resultUser1 && (
          <ScrollView>
            {ListUserRedux.listUser.map((data) => {
              return (
                <View style={styles.leftContainerr} key={data.id}>
                  <Image
                    source={require("../../images/b.jpg")}
                    style={styles.avatar}
                  />
                  <View style={styles.cenContainer}>
                    <Text style={styles.usernamee}>{data.name}</Text>
                  </View>
                  <Button
                    title="Xóa"
                    type="outline"
                    onPress={() => {
                      const action = removeListUser({
                        idNeedToRemove: data.id,
                      });
                      dispatch(action);
                      setListUser(ListUserRedux);
                      setaddingroup(true);
                      setdeleteingroup(false);
                      setResultUser(false);
                      setResultUser1(true);
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={styles.end}>
        <Button
          style={styles.button}
          title="Hoàn tất"
          onPress={addMemberHandler}
        />
      </View>
    </View>
  );
};
export default AddFriendIntoGroup;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textttt: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    height: 30,
    marginTop: 5,
    marginRight: 15,
  },
  viewtim: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    padding: 15,
  },
  body0: {
    alignItems: "flex-start",
    width: "100%",
    height: "7%",
    paddingLeft: 15,
  },
  body: {
    width: "100%",
    height: "25%",
  },
  body1: {
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
  },
  end: {
    width: "60%",
    height: "10%",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
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
  cenContainer: {
    paddingRight: 25,
    marginLeft: 10,
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  buttonn: {
    width: 100,
    marginTop: 10,
  },
  containerr: {
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
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "15%",
    alignItems: "center",
  },
  maincontainerrr: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    borderColor: "#2089dc",
    borderWidth: 1,
    width: "80%",
  },
});
