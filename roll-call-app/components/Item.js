import { TouchableOpacity,View,Text } from "react-native"
import {Card} from "react-native-paper";

const Item = (item)=>{
    console.log(item);
    return (
      <TouchableOpacity>
        {item.presence === "Present" ? 
          <Card style={{marginTop:17,marginRight:10,marginBottom:8,backgroundColor:"green"}}>
          <Card.Content>
          <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <Text >{item.start}</Text>
            <Text >{item.name}</Text>
            {item.presence === "Present" ? <Text>Present</Text>:<Text>Not Present</Text>}
            <Text >{item.end}</Text>
          </View>
          {/* <Avatar.Icon  icon={'icon.png'}/> */}
          </Card.Content>
        </Card>
        :  <Card style={{marginTop:17,marginRight:10,marginBottom:8,backgroundColor:"red"}}>
        <Card.Content>
        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
          <Text >{item.start}</Text>
          <Text >{item.name}</Text>
          {item.presence === "Present" ? <Text>Present</Text>:<Text>Not Present</Text>}
          <Text >{item.end}</Text>
        </View>
        {/* <Avatar.Icon  icon={'icon.png'}/> */}
        </Card.Content>
        </Card>
        }
      
      </TouchableOpacity>
    )

}

export default Item;