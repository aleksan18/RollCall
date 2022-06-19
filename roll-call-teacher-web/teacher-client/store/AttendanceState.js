import { createState } from "@hookstate/core";
import {useState as stateHandler} from "@hookstate/core";
import { Alert } from "react-native";
import {getAttendanceApi} from "../services/attendance.service";
const initialState = {
    attendanceBetweenDates:{},
    errors:[]
};

const attendanceState = createState(initialState);
export const getAttendance = async (startDate, finalDate,token) =>{
    const {attendanceBetweenDates}=await getAttendanceApi(startDate, finalDate,token);
    if(attendanceBetweenDates){
        attendanceState.set({attendanceBetweenDates:attendanceBetweenDates})
    }
}
/**
 * 
 * Hook element to consume
 */
export const useAttendanceState = () => {
  return stateHandler(attendanceState);
};