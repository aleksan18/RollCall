import React,{useEffect} from 'react';
import { 
  StyleSheet,
  View,
  FlatList,
  Dimensions
 } from 'react-native';
 import Lecture from "./Lecture";
 import { Divider, Button } from 'react-native-paper';

 import MonthToDisplay from './MonthToDisplay'

 export default class Calendar extends React.Component{
    numberOfMonths = (12 * 2) + 1 //Number of months we want to display. (12 months in a year) * (number of year) + 1 (for current month)
  
    state = {
      month_data_array : [],
      choosenCourse:{},
      current_month_index : 0, //The current selected month index. We use this to determine should we reset the style of the previous selected month calendar or not.
      lecturesToDisplay:{},
    }
    
    chooseDifferentMonth = (index) => {
      if(index !== this.state.current_month_index){
        this.setState({
          current_month_index : index,
        })

      }
    }
    setLectures = (lectures)=>{
      console.log(lectures);
      this.setState({lecturesToDisplay:{lectures,name:this.state.choosenCourse.courseName}})
    }
    _keyExtractor = (item, index) => `month-calendar-${index}`
    
    _renderItem = ({item, index}) => {
      if(this.state.choosenCourse !== null){
        return(<MonthToDisplay
          style = {
            index === this.state.month_data_array.length - 1 ?
            {
              flex: 1,
              width: Dimensions.get('window').width,
              justifyContent: "center"
            }
    
            :
    
            {
              //flex: 1,
              width: Dimensions.get('window').width,
              marginRight: Dimensions.get('window').width/100, //To create snapping effect
              justifyContent: "center"
            }
          }
          month_data = {item}
          month_index = {index}
          current_month_index = {this.state.current_month_index}
          chooseDifferentMonth = {this.chooseDifferentMonth}
          choosenCourse = {this.state.choosenCourse}
          lectures={this.state.choosenCourse.lecturesForSemester}
          setLectures={this.setLectures}
        />)
      }else{
        return (<View></View>)
      }
     
     
    }
      

    initializeMonths = () => {
      let currentMonth = new Date().getMonth(),
          currentYear = new Date().getFullYear()
  
      this.getFollowingMonths(currentMonth, currentYear, this.numberOfMonths)
    }
    componentDidUpdate(prevProps,prevState) {
      if(this.props.choosenCourse !== prevProps.choosenCourse){
        this.setState({
          choosenCourse:this.props.choosenCourse,
          lecturesToDisplay:{}
        })
      }
      // if(this.state.current_month_index !== prevState.current_month_index){
      //   this.setState({
      //     current_month_index:this.state.current_month_index
      //   })
      // }
    }
    getFollowingMonths = (currentMonth, currentYear, numberOfMonths) => {
      const localData = this.state.month_data_array
      if(numberOfMonths === 0)
          return
          localData.push({
            month:currentMonth,
            year:currentYear
          })
      this.setState({
        month_data_array:[{
          month:currentMonth,
          year:currentYear
        }],
      })
      if(currentMonth === 11){
          currentMonth = 0
          currentYear += 1
      }

      else{
          currentMonth += 1
      }

      numberOfMonths -= 1
     
      
    }
    
    componentDidMount = ()=>{
      this.initializeMonths()
      this.setState({
          month_data_array: [{month:new Date().getMonth(),year:new Date().getFullYear()}],
          choosenCourse:this.props.choosenCourse
      })
    }
    changeMonth = ()=>{
      console.log(this.state.current_month_index);
      console.log(this.state.month_data_array);
      const index =this.state.current_month_index
      const month =this.state.month_data_array[index].month
      const year = this.state.month_data_array[index].year
      this.getFollowingMonths(month+1,year,this.numberOfMonths);
      this.chooseDifferentMonth(this.state.month_data_array.length);
   
      console.log(this.state.month_data_array);     
    }
    goBack = ()=>{
      console.log(this.state.current_month_index);
      console.log(this.state.month_data_array);
      const index =this.state.current_month_index
      const month =this.state.month_data_array[index].month
      const year = this.state.month_data_array[index].year
      this.getFollowingMonths(month-1,year,this.numberOfMonths);
      this.chooseDifferentMonth(this.state.month_data_array.length);
   
      console.log(this.state.month_data_array);     
    }
    render(){
        return (
          <View style={styles.container}>
            <Button mode="contained" onPress={()=>this.changeMonth()}>Go forward</Button>
            <Button mode="contained" onPress={()=>this.goBack()}>Go back</Button>
            <FlatList
                horizontal = {true}
                decelerationRate = {0}
                snapToInterval = {(Dimensions.get('window').width)}
                snapToAlignment = "start"
                showsHorizontalScrollIndicator = {false}
                keyExtractor = {this._keyExtractor}
                initialNumToRender = {1}
                removeClippedSubviews = {true}
                data = {this.state.month_data_array}
                extraData = {{month_data_array:this.state.month_data_array,choosenCourse:this.state.choosenCourse,current_month_index:this.state.current_month_index}}
                renderItem = {this._renderItem}
                windowSize = {15}
            >
            </FlatList>
            <Divider style={{
                width:"90%",
                height:"2px",
                marginBottom:"10%",
                color:"black",
                backgroundColor:"black",
            }}/>
            <Lecture navigation={this.props.navigation} choosenCourse={this.state.choosenCourse} lectures={this.state.lecturesToDisplay} name={this.state.lecturesToDisplay.name}></Lecture>
          </View>
        );
    }
 }

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });