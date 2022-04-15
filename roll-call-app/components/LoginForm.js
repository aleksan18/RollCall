import { useState } from "react";
import React from "react-native";
import { View } from "react-native";
import {Button,Text,StyleSheet} from "react-native";
import { HelperText, TextInput } from 'react-native-paper';
const LoginForm = ({navigation,route})=>{
    const [form,setForm]=useState({
        email:"",
        password:""
    });
    const hasErrors = () => {
        return !form.email.includes('@') && form.email.length !== 0 ; 
    };
    return (
        <View style={styles.container}>
        <TextInput
        label="Email"
        placeholder="Enter your email address"
        textContentType="emailAddress"
        style={styles.inputfields}
        accessibilityLabel="Email"
        onChangeText={text =>setForm({email:text,password:form.password})}
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
        onChangeText={text =>setForm({email:form.email,password:text})}
        value={form.password}
        />
        <HelperText type="error">
            
        </HelperText>
        <Button title="Login" onPress={()=>{navigation.navigate('Checkin',{})}} />
        <Button title="Cancel" onPress={()=>{ setForm({email:"",password:""})}} />
        </View>
    );
}
const styles = StyleSheet.create({
    loginForm:{
        flex: 3,
        margin:"10%",
      },
    inputfields:{
        borderWidth: 1,
        flex:2,
        marginBottom:"5%",
        borderColor:"black",
    }
})
export default LoginForm;