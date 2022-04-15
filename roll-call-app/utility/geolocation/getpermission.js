
import * as Location from 'expo-location';

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
// if the uni coordinates are not within the radius use this method to request the coordinates of the device again
export const retryLocation = async(setLocation)=>{
  let location = await Location.getCurrentPositionAsync({});
  setLocation(location);
}