import * as React from 'react';
import { StyleSheet,View,Text,Button } from "react-native"
import {useState,useEffect} from "react";
const CourseScreen= ({navigation})=>{
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
                <Button title= "Logout" onPress={()=>{navigation.navigate("Home",{ })}}/>
                </View>
                )

        })
        
      })
    useEffect(() => {
    }, []);
    return (
        <View style={styles.container}>
            <Text> Courses</Text>
        </View>
    )
    
}


export default CourseScreen;