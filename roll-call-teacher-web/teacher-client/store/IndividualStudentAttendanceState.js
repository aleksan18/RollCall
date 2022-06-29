import { createState } from "@hookstate/core";
import { useState as stateHandler } from "@hookstate/core";
import { Alert } from "react-native";
import { updateStudentAttendanceApi } from "../services/attendance.service";
const initialState = {
    emailToUpdateStudent: "",
    attendanceForLecture: {},
    studentUpdated: false,
    errors: []
};

const individualStudentAttendanceState = createState(initialState);

export const updateStudentAttendance = async (email, attendance) => {
    const studentUpdated = await updateStudentAttendanceApi(email, attendance);
}
/**
 * 
 * Hook element to consume
 */
export const useIndividualStudentAttendanceState = () => {
    return stateHandler(individualStudentAttendanceState);
};