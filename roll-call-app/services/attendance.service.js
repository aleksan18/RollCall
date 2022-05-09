import axios from "axios";
//http://localhost:5000
//http://192.168.0.101:5000
export const checkInApi = (attendance,token) =>{
    return axios.post("http://192.168.0.101:5000/attendance/addAttendance",{attendance,token},)
    .then((response) =>response.data)
    .catch((error) => {
        console.log(error);
        throw error.response.data;
    });
}
export const getAttendanceApi = (startDate, finalDate,token)=>{
    return axios.post("http://192.168.0.101:5000/attendance/getAttendance",
    {startDate,finalDate,token})
    .then((response) =>response.data)
    .catch((error) => {
        console.log(error);
        throw error.response.data;
    });
}