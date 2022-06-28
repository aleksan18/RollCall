import axios from "axios";
//http://localhost:5000
//http://192.168.0.101:5000
//10.130.183.27:19000
export const checkInApi = (attendance,token) =>{
    return axios.post("http://localhost:5000/attendance/addAttendance",{attendance,token},)
    .then((response) =>response.data)
    .catch((error) => {
        console.log(error);
        throw error.response.data;
    });
}
export const getAttendanceApi = (startDate, finalDate,token)=>{
    return axios.post("http://localhost:5000/attendance/getAttendance",
    {startDate,finalDate,token})
    .then((response) =>response.data)
    .catch((error) => {
        console.log(error);
        throw error.response.data;
    });
}

export const getAttendanceForLectureApi = (course_id, lecture_id, token) => {
    return axios.post("http://192.168.0.102:5000/attendance/getAttendanceForLecture",
        { course_id, lecture_id, token })
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            throw error.response.data;
        });
}

export const updateStudentAttendanceApi = (email, attendance) => {
    return axios.post("http://192.168.0.102:5000/db/updateStudentAttendance",
        { email, attendance })
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            throw error.response.data;
        });
}