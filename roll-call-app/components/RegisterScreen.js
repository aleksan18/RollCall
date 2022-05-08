import { useState } from "react";
import React from "react-native";
import { View } from "react-native";
import {Button,Text,StyleSheet,Alert} from "react-native";
import { HelperText, TextInput } from 'react-native-paper';
import {login,register,useAuthState} from "../store/AuthState";

const RegisterScreen = ({navigation,route,})=>{
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'lightblue',
            alignItems: 'center',
            justifyContent: 'center',
          },
        loginForm:{
            flex: 3,
            
            margin:"10%",
          },
        inputfields:{
            maxWidth:"50vw",
            maxHeight:"10vh",
            borderWidth: 1,
            flex:2,
            marginBottom:"5%",
            borderColor:"black",
        }
    })
    const authState = useAuthState();
    console.log(authState);
    const [form,setForm]=useState({
        email:"",
        password:"",
        confirmPassword:""
    });
    console.log(form);
    const hasErrors = () => {
        if(form.password !== form.confirmPassword){
            return false;
        }
        return !form.email.includes('@') && form.email.length !== 0 ; 
    };
    return (
        <View style={styles.container}>
        <Text> Register</Text>
        <View style={styles.loginForm}>
        <TextInput
        label="Email"
        placeholder="Enter your email address"
        textContentType="emailAddress"
        style={styles.inputfields}
        accessibilityLabel="Email"
        onChangeText={text =>setForm({email:text,password:form.password,confirmPassword:form.confirmPassword})}
        value={form.email}
        />
        <HelperText type="error"  visible={hasErrors()}>
        Invalid email address
        </HelperText>

       
        <TextInput
        label="Password"
        placeholder="Enter your password"
        textContentType="password"
        secureTextEntry
        style={styles.inputfields}
        accessibilityLabel="Password"
        onChangeText={text =>setForm({email:form.email,password:text,confirmPassword:form.confirmPassword})}
        value={form.password}
        />
        <TextInput
        label="Confirm password"
        placeholder="Enter your password again"
        textContentType="password"
        secureTextEntry
        style={styles.inputfields}
        accessibilityLabel="Password"
        onChangeText={text =>setForm({email:form.email,password:form.password,confirmPassword:text})}
        value={form.confirmPassword}
        />
        <HelperText type="error">
            
        </HelperText>
        <Button title="Register" onPress={async()=>{
            if(register(form.email, form.password)){
                navigation.navigate("Home")
            }else{
                Alert.alert("Internal Server Error,","An error has occurred. Please try again",[{
                text:"Okay",
                onPress:()=>{console.log("okay was pressed")
                close()
                },
                style:"default"
                }])
            }
            
        }} />
        <Button title="Cancel" onPress={()=>{ setForm({email:"",password:"",confirmPassword:""})}} />
        </View>
        </View>
    );
}

export default RegisterScreen