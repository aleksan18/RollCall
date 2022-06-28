import { View } from "react-native"
import { Divider, Text } from 'react-native-paper';
import {Button} from 'react-native-paper'
const Lecture = ({lectures,name})=>{
    
    if(Object.keys(lectures).length !== 0){
        console.log(lecture);
        const lecture = lectures.lectures
        const currentdate = new Date(lecture.startDateAndTime);
        const oneJan = new Date(currentdate.getFullYear(),0,1);
        const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
        const result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
        return(
            <View style={{
                marginBottom:"5%"
            }}>
                
                <Text>Lecture: {name} Week:#{result}</Text>
                <Text>
                Start Time: {new Date(lecture.startDateAndTime).getDate()-1}:{new Date(lecture.startDateAndTime).getMonth()+1}:{new Date(lecture.startDateAndTime).getFullYear()}</Text>
                <Text>End Time: {new Date(lecture.endDateAndTime).getDate()-1}:{new Date(lecture.endDateAndTime).getMonth()+1}:{new Date(lecture.endDateAndTime).getFullYear()}</Text>
                <Button>
                View Lecture Attendance
                </Button>
            </View>
        )
    }else{
        return(<View>

        </View>)
    }
    

}

export default Lecture