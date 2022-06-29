import * as React from 'react';
import { StyleSheet, View, Text, FlatList } from "react-native"
import {Button} from "react-native-paper"
import { useState, useEffect } from "react";
import {updateStudentAttendance,useIndividualStudentAttendanceState} from "../store/IndividualStudentAttendanceState";
import {getAttendanceForLectureApi} from "../services/attendance.service";
import {login,useAuthState} from "../store/AuthState"
import { Downgraded } from '@hookstate/core';

const StudentAttendance = ({ navigation,route }) => {
    const individualStudentAttendanceState = useIndividualStudentAttendanceState();
    const attendanceForLecture = individualStudentAttendanceState.attach(Downgraded).get().attendanceForLecture;
    console.log(attendanceForLecture);
    const {choosenCourse,lecture} = route.params;
    console.log(lecture);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'lightblue',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    const authState = useAuthState();
    const token = authState.attach(Downgraded).get().user.token
    const [errorMsg, setErrorMsg] = useState("");
    const [studentsPresentInLectureReceived, setStudentsPresentInLectureReceived] = useState([]);
    const [studentsNotPresentInLectureReceived, setStudentsNotPresentInLectureReceived] = useState([]);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Button title="Logout" onPress={() => { navigation.navigate("Home", {}) }} />
                </View>
            )

        })

    })
    useEffect(() => {
        const {studentsPresentInLecture, studentsNotPresentInLecture} = attendanceForLecture;
        setStudentsPresentInLectureReceived(studentsPresentInLecture)
        setStudentsNotPresentInLectureReceived(studentsNotPresentInLecture)
    }, [attendanceForLecture]);
    return (
        <View style={styles.container}>
            <Text>Students present in the lecture</Text>
            <FlatList 
            data={studentsPresentInLectureReceived}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={({item}) =>(
                <View style={{flexDirection: 'row', flexWrap:'wrap'}}> 
                    <Text>{item.studentEmail}</Text>
                    <Button compact={true} mode="contained" onPress={ async ()=>{ 
                        await updateStudentAttendance(
                            item.studentEmail, {
                                lectureForSemesterId: lecture.lectureForSemesterId,
                                courseId : choosenCourse._id,
                                courseName: choosenCourse.courseName,
                                startDateAndTime:lecture.startDateAndTime,
                                endDateAndTime: lecture.endDateAndTime,
                                presence: "Not Present"
                            }
                        )
                        const newAttendanceForLecture = await getAttendanceForLectureApi(choosenCourse._id,lecture.lectureForSemesterId, token)
                        individualStudentAttendanceState.set({attendanceForLecture: newAttendanceForLecture})
                    }} >Change</Button>
                </View>
            )}
            />
            {/* <Text> {studentAttendance.studentsPresentInLecture[0].studentEmail}</Text> */}
            <Text>Students not present in the lecture</Text>
            {/* <FlatList 
            data={studentsNotPresentInLectureReceived}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={({item}) =>(
                <View> 
                    <Text>{item.studentEmail}</Text>
                </View>
            )}
            /> */}
            <FlatList 
            data={studentsNotPresentInLectureReceived}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={({item}) =>(
                <View style={{flexDirection: 'row', flexWrap:'wrap'}}> 
                    <Text>{item.studentEmail}</Text>
                    <Button compact={true} mode="contained" onPress={ async ()=>{ 
                        await updateStudentAttendance(
                            item.studentEmail, {
                                lectureForSemesterId: lecture.lectureForSemesterId,
                                courseId : choosenCourse._id,
                                courseName: choosenCourse.courseName,
                                startDateAndTime:lecture.startDateAndTime,
                                endDateAndTime: lecture.endDateAndTime,
                               presence: "Present"
                          }
                        )
                        const newAttendanceForLecture = await getAttendanceForLectureApi(choosenCourse._id,lecture.lectureForSemesterId, token)
                        individualStudentAttendanceState.set({attendanceForLecture: newAttendanceForLecture})
                    }} >Change</Button>
                </View>
            )}
            />
        </View>
    )

}


export default StudentAttendance;