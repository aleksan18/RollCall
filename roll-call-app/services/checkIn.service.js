import axios from "axios";
export const checkInApi = (courseId,token) =>{
    return axios.post("http://192.168.0.101:5000/attendance/addAttendance",{},{headers:{authorization:`Bearer ${token}`}})
    .then((response) =>response.data)
    .catch((error) => {
        console.log(error);
        throw error.response.data;
    });
}