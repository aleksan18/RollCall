import { useState } from "react";
import React from "react-native";
import { View } from "react-native";
import {Button,Text,TextInput,StyleSheet} from "react-native";

const LoginForm = ()=>{
    const [form,setForm]=useState({
        email:"",
        password:""
    })
    return (
        <View>
        <TextInput
        style={styles.inputfields}
        accessibilityLabel="Email"
        onChangeText={text =>setForm({email:text,password:form.password})}
        value={form.email}
        ></TextInput>
        <TextInput
         style={styles.inputfields}
        accessibilityLabel="Password"
        onChangeText={text =>setForm({email:form.email,password:text})}
        value={form.password}
        ></TextInput>
        <Button title="Login" onPress={()=>{}} />
        <Button title="Cancel" onPress={()=>{}} />
        </View>
    );
}
const styles = StyleSheet.create({
inputfields:{
    borderWidth: 1,
    flex:2,
    marginBottom:"5%",
    borderColor:"black",
}
})
export default LoginForm;