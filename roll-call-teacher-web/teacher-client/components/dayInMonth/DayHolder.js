import React from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { useLectureState } from '../../store/LectureState';
export default class DayHolder extends React.PureComponent{
    
    state = {
        dayHolderStyle: {},
        dayTextStyle: {},
    }

    chooseDay = (index) => {
        this.setState({
            dayHolderStyle: styles.ChosenDayHolder,
            dayTextStyle: styles.ChosenDayText,
           
        })

        this.props.changeCurrentCalendarDayIndex(index)

        this.props.chooseDifferentMonth(this.props.month_index)
    }
    chooseDayForDisplayLecture = (index,lecturesDayHolder) => {
        console.log(lecturesDayHolder);
        this.setState({
            dayHolderStyle: styles.ChosenDayHolder,
            dayTextStyle: styles.ChosenDayText,
           
        })
        this.props.changeCurrentCalendarDayIndex(index)
        this.props.setLectures(lecturesDayHolder)
        this.props.chooseDifferentMonth(this.props.month_index)
    }
    componentDidMount(){
      
        this.setState({
            dayHolderStyle: styles.UnchosenDayHolder,
            dayTextStyle: styles.UnchosenDayText,
        })
    }

    componentDidUpdate(prevProps, prevState){
        //If we choose another day then we reset the previous day's style
        //This means if this day is the previous day then reset its style
        if(this.props.lectures !== prevProps.lectures){
           
        }
        if(this.props.lastCalendarDayIndex !== prevProps.lastCalendarDayIndex && this.props.lastCalendarDayIndex === this.props.calendarDayIndex){
            this.setState({
                dayHolderStyle: styles.UnchosenDayHolder,
                dayTextStyle: styles.UnchosenDayText,
                
            })
        }

        if(this.props.month_index !== this.props.current_month_index && this.props.current_month_index !== prevProps.current_month_index){
            this.setState({
                dayHolderStyle: styles.UnchosenDayHolder,
                dayTextStyle: styles.UnchosenDayText,
            })
        }
    }

    render(){
        let daySetForLecture;
        let lecturesDayHolder;
        this.props.lectures.map((item)=>{
           if(new Date(item.startDateAndTime).getDate() === this.props.day ){
               daySetForLecture = this.props.day
               lecturesDayHolder =item;
           }
       })
        if( daySetForLecture === this.props.day){
            return(
                <TouchableHighlight
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                    }}
    
                    underlayColor="transparent"
                    onPress = {this.chooseDayForDisplayLecture.bind(this, this.props.calendarDayIndex,lecturesDayHolder)}
                >
                    <View
                        style={styles.LectureDayHolder}
                    >
                        <Text
                            style={this.state.dayTextStyle}
                        >
                            {this.props.day}
                        </Text>
                    </View>
    
                </TouchableHighlight>
            )
        }else{
            return(
                <TouchableHighlight
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                    }}
    
                    underlayColor="transparent"
                    onPress = {this.chooseDay.bind(this, this.props.calendarDayIndex)}
                >
                    <View
                        style={this.state.dayHolderStyle}
                    >
                        <Text
                            style={this.state.dayTextStyle}
                        >
                            {this.props.day}
                        </Text>
                    </View>
    
                </TouchableHighlight>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    UnchosenDayHolder: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "white"
    },

    UnchosenDayText: {
        color: 'black'
    },

    ChosenDayHolder: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "black"
    },

    ChosenDayText: {
        color: 'white'
    },
    LectureDayHolder:{
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "red"
    }
})