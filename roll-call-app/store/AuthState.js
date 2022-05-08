import { createState } from "@hookstate/core";
import {useState as stateHandler} from "@hookstate/core";
import { Alert } from "react-native";
import {loginApi,fetchLoginApi} from "../services/user.service";
const initialState = {
  isLoggedIn: false,
  user: {},
  errors:[{}]
};

const authState = createState(initialState);
/**
 * Sends a network request to the server to retrive the email and password
 * @param {string} email 
 * @param {password} password 
 */
export const login =async (email, password) => {
  // do network call to post login data
  // eg: axios.post()
  try{
  const response = await loginApi(email,password);
    //authState.set(user=>response);
  if(response.email === email){
    authState.set({user: response,isLoggedIn:true,errors:[{}]})
  }
  console.log(authState.get());

}catch(error){
    console.log(error);
    authState.set({...initialState,errors:error.errors})
    Alert.alert("","",[{
        text:"",
        onPress:()=>{console.log("okay rpessed")},
        style:'default',
    }])
}
};
/**
 * Sets the state to the initial state
 */
export const logout = () => {
  authState.set(initialState);
};

/**
 * 
 * Hook element to consume
 */
export const useAuthState = () => {
  return stateHandler(authState);
};