import { View,StyleSheet,SafeAreaView } from "react-native"
import { Agenda} from 'react-native-calendars';
import Item from './Item';
const Attendance = ({navigation})=>{
    const styles = StyleSheet.create({
        
        container: {
          flex: 1,
        },
      });
    return(
        <SafeAreaView style={styles.container}>
          <Agenda 
            items={{
              '2022-04-16': [
              {name: 'class 1',start:"13:22",end:"16:55",type:true},
              {name: 'class 2',start:"12:22",end:"13:00",type:false}],
              '2022-04-17':[{name:"class 3",start:"13:11",end:"16:00",type:true}]
            }}
            loadItemsForMonth={month => {
            }}
            renderItem={Item}
          />
        </SafeAreaView>
    )
}

export default Attendance