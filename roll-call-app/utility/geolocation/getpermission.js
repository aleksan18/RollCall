
import * as Location from 'expo-location';
/**
 * This function sets up the location for the app
 * @param {func} setLocation A useState function to set the location in the app
 * @param {func} setErrorMsg A useState function to set the error message in the app
 * @returns {Promise:<void>} Returns void but sets the location and any error messages if they occur
 */
export const setUp = async (setLocation, setErrorMsg) => {
  // Check if the permissions for location have been granted to the app
  let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
  // Get the location of the phone
  let location_device = await Location.getCurrentPositionAsync({});
  setLocation(location_device);
}
/**
 * if the uni coordinates are not within the radius use this method to request the coordinates of the device again
 * @param {func} setLocation A useState function to set the location in the app
 */
export const retryLocation = async(setLocation)=>{
  let location = await Location.getLastKnownPositionAsync({requiredAccuracy:25});
  setLocation(location);
}
/**
 *   This method calculates the radius 
 * @param {LocationObjectControls} geoStudent The location object of the student received from the phone
 * @param {LocationObjectControls} geoUniversity The location object of the university received from the backend
 */
export const calcRadius = (geoStudent,geoUniversity)=>{
  console.log(geoUniversity)
        // degrees to radians.
        const lon1 =  geoStudent.longitude * Math.PI / 180;
        const lon2 = geoUniversity.longitude * Math.PI / 180;
        const lat1 = geoStudent.latitude * Math.PI / 180;
        const lat2 = geoUniversity.latitude * Math.PI / 180;
   
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * Math.pow(Math.sin(dlon / 2),2);
               
        let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in meters.
        let r = 6371*1000;
        console.log(r*c);
        return(c * r);
}