import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useRoute } from "@react-navigation/core";
import call from 'react-native-phone-call';

const Call =()=>{
    const route = useRoute();
    const triggerCall = () => {
        const args = {
          number: route.params.user.phone,
          prompt: true,
        };
        call(args).catch(console.error);
      };
    // console.log('====================================');
    // console.log(route.params.user.phone);
    // console.log('====================================');
    return (
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <Button containerStyle={{width:200}} title="Gọi" onPress={triggerCall}/>
        </View>
    )
}
export default Call;