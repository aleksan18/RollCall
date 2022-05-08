import * as React from 'react';
import {useState,useEffect} from "react";
import {StyleSheet,View,Button,Text} from "react-native";
import {calcRadius} from "../utility/geolocation/getpermission";
import { countdown } from '../utility/clocktimer/clocktimer';
import {getNearestLecture} from '../utility/lectures/lectures';
import {logout,sendAttendance,useAuthState} from "../store/AuthState";
import {getAttendance} from "../store/AttendanceState";
import { Downgraded } from '@hookstate/core';
const Checkin = ({navigation,route})=>{
    const styles = StyleSheet.create({
        
        container: {
          flex: 1,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
        checkin:{
            width: '300px',
            height:'100%',
        }
      })
    const authState = useAuthState();
    React.useLayoutEffect(()=>{
      navigation.setOptions({
          headerLeft: ()=>(<View></View>), 
          headerRight: ()=>(
              <View>
              <Button title= "Logout" onPress={()=>{logout(); navigation.navigate("Home",{ })}}/>
              <Button title="Attendance" onPress={async()=>{
                const oneMonthEarlier = new Date();
                oneMonthEarlier.setMonth(oneMonthEarlier.getMonth()-1);
                await getAttendance(oneMonthEarlier,new Date(),authState.attach(Downgraded).get().user.token)
                navigation.navigate("Attendance")}}/></View>
              )
      })
    })
    // add with useState a checkIn control
    // after checking in the timer should be removed
    //DONE
    const {location} = route.params;
    console.log(location);
    const {nearestLecture,timer} = getNearestLecture(authState.attach(Downgraded).get().user.todaysLectures)
    if(typeof nearestLecture === 'undefined') {
      return(
        <View style={styles.container}>
          <Text>No lectures today sorry! :P</Text>
        </View>
      )
    }else{
    const [timerCount, setTimer] = useState(timer);
    const [checkInControl,setCheckInControl] = useState(false);
    const [radius,setRadius] = useState({});
    const [uniLocation,setUniLocation] = useState(nearestLecture.geolocation[0]);    
    useEffect(() => {
        countdown(setTimer,checkInControl);
        setRadius(calcRadius(location.coords,uniLocation))
    }, []);
     
    return (
        <View style={styles.container} >
            {radius < uniLocation.radius ? 
            (timerCount <1800 ?
            (timerCount>0 ? 
            (!checkInControl ?
            <View>
            <Text>{Math.floor(timerCount/60/60)} : {Math.floor(timerCount/60%60)*1} : {Math.round(timerCount%60)}</Text>
            <Button style={styles.checkin} title="Check In" onPress={()=>{
            //check In call gere which should then return and refresh the user object
            setCheckInControl(true);
            sendAttendance(nearestLecture.lectureForSemesterId,nearestLecture.courseId,nearestLecture.courseName,nearestLecture.startDateAndTime,nearestLecture.endDateAndTime,"Present",authState.attach(Downgraded).get().user.token)
          }  
            }/>
            </View>
            :<Text>Checked in</Text>)
            :<Text>Check in time has closed</Text>)
            :(<Text>Check in time too far away</Text>))
            :(<Text>Not near enough to check in</Text>)}
        </View>
    )
  }
}

export default Checkin;