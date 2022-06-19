import axios from "axios";
export const loginApi = (email,password) =>{
    return  axios.post('http://10.130.183.27:5000/auth/login',{email,password},)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error.response.data;
    });
}

export const registerApi = (email,password) =>{
  return axios.post('http://10.130.183.27:5000/auth/register',{email,password}) .then((response) => response.data)
  .catch((error) => {
    console.log(error);
    throw error.response.data;
  });

}