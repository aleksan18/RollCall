import { StyleSheet,View,Text } from "react-native"
import LoginForm from "./LoginForm";
import GeoLocation from "./GeoLocation";
const HomeScreen= ({navigation})=>{
    const styles = StyleSheet.create({
        
        container: {
          flex: 1,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
    return (
        <View style={styles.container}>
            <Text> Login</Text>
            <LoginForm navigation={navigation}/>
            <GeoLocation />
        </View>
    )
    
}


export default HomeScreen;