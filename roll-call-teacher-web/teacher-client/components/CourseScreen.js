import * as React from 'react';
import { StyleSheet,View,Text,Button, FlatList, Dimensions } from "react-native"
import {Card, Chip} from "react-native-paper";
import {useState,useEffect} from "react";
import {logout,useAuthState} from "../store/AuthState";
import { Downgraded } from '@hookstate/core';

import Calendar from './Calendar';
import {login,useAuthState} from "../store/AuthState"
import {updateStudentAttendance,useIndividualStudentAttendanceState} from "../store/IndividualStudentAttendanceState";
import {getAttendanceForLectureApi} from "../services/attendance.service";
import { Downgraded } from '@hookstate/core';

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
      const authState = useAuthState();
      const individualStudentAttendanceState = useIndividualStudentAttendanceState();
      console.log("Inside CourseScreen > authState: ", authState);
      console.log("Inside CourseScreen > authState.get().user: ", authState.get().user);
      console.log("Inside CourseScreen > authState.attach(Downgraded).get().user.token: ", authState.attach(Downgraded).get().user.token);
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
            <Button title= "Click" onPress={ async ()=>{
              const attendanceForLecture = await getAttendanceForLectureApi("62666c8732509c342d776af0", "62666ce532509c342d776af1", authState.attach(Downgraded).get().user.token)
              individualStudentAttendanceState.set({attendanceForLecture, studentUpdated: false,})
              console.log("Inside CourseScreen > attendanceForLecture: ", attendanceForLecture);
              navigation.navigate("Student Attendance",{ attendanceForLecture })}}/>
        </View>
    )
    
}


export default CourseScreen;