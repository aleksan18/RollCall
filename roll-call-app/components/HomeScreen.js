import * as React from 'react';
import { StyleSheet,View,Text,Button } from "react-native"
import LoginForm from "./LoginForm";
import GeoLocation from "./GeoLocation";
import {setUp,calcRadius} from "../utility/geolocation/getpermission";
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
      const [location, setLocation] = useState({
        coords:{},
        timestamp:null
    });
   
    const [errorMsg, setErrorMsg] = useState("");
    console.log(location);
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
        setUp(setLocation,setErrorMsg);
    }, []);
    return (
        <View style={styles.container}>
            <Text> Login</Text>
            <LoginForm navigation={navigation} location={location} />
            <GeoLocation />
        </View>
    )
    
}


export default HomeScreen;