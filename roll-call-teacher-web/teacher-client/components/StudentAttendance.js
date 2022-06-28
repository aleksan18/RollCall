import * as React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from "react-native"
import { useState, useEffect } from "react";
import {updateStudentAttendance,useIndividualStudentAttendanceState} from "../store/IndividualStudentAttendanceState";
import {getAttendanceForLectureApi} from "../services/attendance.service";
import {login,useAuthState} from "../store/AuthState"
import { Downgraded } from '@hookstate/core';

const StudentAttendance = ({ navigation }) => {
    const individualStudentAttendanceState = useIndividualStudentAttendanceState();
    const attendanceForLecture = individualStudentAttendanceState.attach(Downgraded).get().attendanceForLecture;
    console.log("StudentAttendance > individualStudentAttendanceState.attach(Downgraded).get(): ", individualStudentAttendanceState.attach(Downgraded).get())
    console.log("StudentAttendance > attendanceForLecture: ", attendanceForLecture)
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
    console.log("Inside Student Attendance > individualStudentAttendanceState: ", individualStudentAttendanceState);
    console.log("Inside Student Attendance > individualStudentAttendanceState.get(): ", individualStudentAttendanceState.get());
    console.log("Inside Student Attendance > individualStudentAttendanceState.attach(Downgraded).get().studentUpdated: ", individualStudentAttendanceState.attach(Downgraded).get().studentUpdated);
   
    console.log("Inside Student Attendance > authState.get(): ", authState.get());
    const [errorMsg, setErrorMsg] = useState("");
    const [studentsPresentInLectureReceived, setStudentsPresentInLectureReceived] = useState([]);
    const [studentsNotPresentInLectureReceived, setStudentsNotPresentInLectureReceived] = useState([]);
    console.log(errorMsg);
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
        console.log("StudentAttendance > useEffect > studentsPresentInLecture: ", studentsPresentInLecture)
        console.log("StudentAttendance > useEffect > studentsNotPresentInLecture: ", studentsNotPresentInLecture)
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
                    <Button title="Change" onPress={ async ()=>{ 
                        await updateStudentAttendance(
                            item.studentEmail, {
                                lectureForSemesterId: "62666ce532509c342d776af1",
                                courseId : "62666c8732509c342d776af0",
                                courseName: "Testing",
                                startDateAndTime:"2022-04-24T22:08:30.000+00:00",
                                endDateAndTime: "2022-04-24T22:10:00.000+00:00",
                                presence: "Not Present"
                            }
                        )
                        const newAttendanceForLecture = await getAttendanceForLectureApi("62666c8732509c342d776af0", "62666ce532509c342d776af1", token)
                        individualStudentAttendanceState.set({attendanceForLecture: newAttendanceForLecture})
                    }} />
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
                    <Button title="Change" onPress={ async ()=>{ 
                        await updateStudentAttendance(
                            item.studentEmail, {
                                                    lectureForSemesterId: "62666ce532509c342d776af1",
                                                    courseId : "62666c8732509c342d776af0",
                                                    courseName: "Testing",
                                                    startDateAndTime:"2022-04-24T22:08:30.000+00:00",
                                                    endDateAndTime: "2022-04-24T22:10:00.000+00:00",
                                                    presence: "Present"
                                                }
                        )
                        const newAttendanceForLecture = await getAttendanceForLectureApi("62666c8732509c342d776af0", "62666ce532509c342d776af1", token)
                        individualStudentAttendanceState.set({attendanceForLecture: newAttendanceForLecture})
                    }} />
                </View>
            )}
            />
        </View>
    )

}


export default StudentAttendance;