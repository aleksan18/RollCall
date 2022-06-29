import { View } from "react-native"
import { Divider, Text } from 'react-native-paper';
import {Button} from 'react-native-paper';
import {useIndividualStudentAttendanceState} from "../store/IndividualStudentAttendanceState";
import {getAttendanceForLectureApi} from "../services/attendance.service";
import {useAuthState} from "../store/AuthState";
import { Downgraded } from '@hookstate/core';

const Lecture = ({navigation,choosenCourse,lectures,name})=>{
    
    if(Object.keys(lectures).length !== 0){
        console.log(lecture);
        const authState = useAuthState();
        const individualStudentAttendanceState = useIndividualStudentAttendanceState();
        const lecture = lectures.lectures
        const currentdate = new Date(lecture.startDateAndTime);
        const oneJan = new Date(currentdate.getFullYear(),0,1);
        const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
        const result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
        return(
            <View style={{
                marginBottom:"5%"
            }}>
                
                <Text>Lecture: {name} Week:#{result}</Text>
                <Text>
                Start Time: {new Date(lecture.startDateAndTime).getDate()}:{new Date(lecture.startDateAndTime).getMonth()+1}:{new Date(lecture.startDateAndTime).getFullYear()}</Text>
                <Text>End Time: {new Date(lecture.endDateAndTime).getDate()}:{new Date(lecture.endDateAndTime).getMonth()+1}:{new Date(lecture.endDateAndTime).getFullYear()}</Text>
                <Button compact={true} mode="contained" onPress={ async ()=>{
              const attendanceForLecture = await getAttendanceForLectureApi(choosenCourse._id, lecture.lectureForSemesterId, authState.attach(Downgraded).get().user.token)
              individualStudentAttendanceState.set({attendanceForLecture, studentUpdated: false,})

              navigation.navigate("Student Attendance",{ lecture:lecture,choosenCourse:choosenCourse })}}> View Lecture Attendance</Button>
            </View>
        )
    }else{
        return(<View>

        </View>)
    }
    

}

export default Lecture