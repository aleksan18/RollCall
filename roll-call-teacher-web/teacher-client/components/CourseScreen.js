import * as React from 'react';
import { StyleSheet,View,Text,Button, FlatList, Dimensions } from "react-native"
import {Card, Chip} from "react-native-paper";
import {useState,useEffect} from "react";
import Calendar from './Calendar';
import {login,useAuthState} from "../store/AuthState"
import {updateStudentAttendance,useIndividualStudentAttendanceState} from "../store/IndividualStudentAttendanceState";
import {getAttendanceForLectureApi} from "../services/attendance.service";
import { Downgraded } from '@hookstate/core';

const CourseScreen= ({navigation})=>{
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
      const authState = useAuthState();
      const individualStudentAttendanceState = useIndividualStudentAttendanceState();
      console.log("Inside CourseScreen > authState: ", authState);
      console.log("Inside CourseScreen > authState.get().user: ", authState.get().user);
      console.log("Inside CourseScreen > authState.attach(Downgraded).get().user.token: ", authState.attach(Downgraded).get().user.token);
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
            <Button title= "Click" onPress={ async ()=>{
              const attendanceForLecture = await getAttendanceForLectureApi("62666c8732509c342d776af0", "62666ce532509c342d776af1", authState.attach(Downgraded).get().user.token)
              individualStudentAttendanceState.set({attendanceForLecture, studentUpdated: false,})
              console.log("Inside CourseScreen > attendanceForLecture: ", attendanceForLecture);
              navigation.navigate("Student Attendance",{ attendanceForLecture })}}/>
        </View>
    )
    
}


export default CourseScreen;