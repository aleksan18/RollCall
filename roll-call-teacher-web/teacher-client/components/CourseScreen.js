import * as React from 'react';
import { StyleSheet,View,Text,Button, FlatList, Dimensions } from "react-native"
import {Card, Chip} from "react-native-paper";
import {useState,useEffect} from "react";
import {logout,useAuthState} from "../store/AuthState";
import { Downgraded } from '@hookstate/core';

import Calendar from './Calendar';
const CourseScreen= ({navigation})=>{
  const authState = useAuthState();
  const courses = authState.attach(Downgraded).get().user.teacherCourses;
  const [choosenCourse,setChoosenCourse] = useState({});
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
   
    const [errorMsg, setErrorMsg] = useState("");
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <View>
                <Button title= "Logout" onPress={()=>{logout();navigation.navigate("Home",{ })}}/>
                </View>
                )

        })
        
      })
    useEffect(() => {
    }, []);

    return (
        <View style={styles.container}>
            <Text> Courses: </Text>
            {courses.map((item,index)=>{
              return(
                <Chip
                id={`chip_${index}`}
                onPress={()=>{
                  console.log(item);
                  if(item === choosenCourse){
                    setChoosenCourse({});
                  }else{
                    setChoosenCourse(item);
                  }
                 
                  console.log(choosenCourse);
                }}
                selected={item===choosenCourse}
                >{item.courseName}</Chip>
              )
            })}
            <Calendar choosenCourse={choosenCourse}></Calendar>
        </View>
    )
    
}


export default CourseScreen;