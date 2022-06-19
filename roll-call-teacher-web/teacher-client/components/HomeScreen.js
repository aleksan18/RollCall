import * as React from 'react';
import { StyleSheet,View,Text,Button } from "react-native"
import LoginForm from "./LoginForm";
import {useState,useEffect} from "react";
const HomeScreen= ({navigation})=>{
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
   
    const [errorMsg, setErrorMsg] = useState("");
    console.log(errorMsg);
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <View>
                <Button title= "Register" onPress={()=>{navigation.navigate("Register",{ })}}/>
                </View>
                )

        })
        
      })
    useEffect(() => {
    }, []);
    return (
        <View style={styles.container}>
            <Text> Login</Text>
            <LoginForm navigation={navigation} />
        </View>
    )
    
}


export default HomeScreen;