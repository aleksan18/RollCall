import * as React from 'react';
import { StyleSheet,View,Text,Button, FlatList, Dimensions } from "react-native"
import {Card, Chip} from "react-native-paper";
import {useState,useEffect} from "react";
import Calendar from './Calendar';
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
            <Text> Courses: </Text>
            <Chip></Chip>
            <Calendar></Calendar>
        </View>
    )
    
}


export default CourseScreen;