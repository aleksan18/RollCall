import * as React from 'react';
import {useState,useEffect} from "react";
import {StyleSheet,View,Button,Text} from "react-native";
import { timer } from '../utility/clocktimer/clocktimer';
const Checkin = ({navigation})=>{
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
    // add with useState a checkIn control
    // after checking in the timer should be removed
    //DONE
    const startTime = new Date(
        'April 16, 2022 12:00:40'
    ).getTime();
    const currentTime = new Date().getTime()
    const [timerCount, setTimer] = useState((startTime- currentTime)/1000)
    const [checkInControl,setCheckInControl] = useState(false);
 
    useEffect(() => {
        timer(setTimer,checkInControl)
    }, []);
      React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(<View></View>), 
            headerRight: ()=>(
                <View>
                <Button title= "Logout" onPress={()=>{ navigation.navigate("Home",{ })}}/>
                <Button title="Attendance" onPress={()=>{ navigation.navigate("Attendance")}}/></View>
                )

        })
        
      })

    return (
        <View style={styles.container} >
            
            {timerCount>0  ? (!checkInControl ?
            <View>
            <Text>{Math.floor(timerCount/60/60)} : {Math.floor(timerCount/60%60)*1} : {Math.round(timerCount%60)}</Text>
            <Button style={styles.checkin} title="Check In" onPress={()=>{setCheckInControl(true)}}/>
            </View>
            :<Text>Checked in</Text>)
            :<Text>Check in time has closed</Text>}
        </View>
    )
}

export default Checkin;