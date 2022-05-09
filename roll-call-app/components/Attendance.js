import { View,StyleSheet,SafeAreaView } from "react-native"
import { Agenda} from 'react-native-calendars';
import Item from './Item';
import {useAttendanceState} from "../store/AttendanceState";
import { Downgraded } from '@hookstate/core';

const Attendance = ({navigation})=>{
    const attendanceState = useAttendanceState();
    console.log(attendanceState);
    const attendance = attendanceState.attach(Downgraded).get().attendanceBetweenDates.attendance
    const styles = StyleSheet.create({
        
        container: {
          flex: 1,
        },
      }); 
      //
      const dateArray = Object.assign(...attendance.map((item)=>{
        return {[item.startDateAndTime.split("T")[0]]:[]}
      }))
      const itemsForDisplay = attendance.map(item =>{
        const date =  item.startDateAndTime.split("T")[0]
        if(Object.keys(dateArray).includes(date)){
          dateArray[date].push({
            name:item.courseName,start:item.startDateAndTime,end:item.endDateAndTime,presence:item.presence
          })
        }
    })
      console.log(dateArray)
    return(
        <SafeAreaView style={styles.container}>
          <Agenda 
            items={dateArray}
            loadItemsForMonth={month => {
            }}
            renderItem={Item}
          />
        </SafeAreaView>
    )
}

export default Attendance