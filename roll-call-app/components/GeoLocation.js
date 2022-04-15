import {useState,useEffect} from "react";
import { View,Text } from "react-native";
import {setUp} from "../utility/geolocation/getpermission";


const GeoLocation = () =>{

    const [location, setLocation] = useState({
        coords:{},
        timestamp:null
    });
    const [errorMsg, setErrorMsg] = useState("");
    console.log(location);
    console.log(errorMsg);
    useEffect(() => {
        setUp(setLocation,setErrorMsg);
    }, []);
    return(
        //  Move setUp to Sign in
        // here to add-->
        //  check if the location is with the desired radius
        // do math here
        // add external function to do the math
        // add button to re-request the position if uni is not within the radius
        <>
        </>
    )

}

export default GeoLocation;