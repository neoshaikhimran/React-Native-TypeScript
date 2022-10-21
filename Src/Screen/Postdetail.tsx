
import { View,Text,StyleSheet, TouchableOpacity} from "react-native";
import {  useRoute ,useNavigation } from "@react-navigation/native";
import {firebase} from '../Auth/config'


const Prodetails = ()=> {
   const route = useRoute();
  
   const {name,body,id} = route.params
    return(
        <View>
             <View>
            <Text style={styles.title}> {id} {name}</Text>
            <Text style={styles.bodytext}> {body}</Text>
           
         </View>
         <View>
          <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {firebase.auth().signOut()}}>
            <Text style={styles.buttonTextStyle}>SIGN OUT</Text>
          </TouchableOpacity>
         </View>
        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginVertical: 8,
        fontWeight:'bold' ,
        color:'black',
        fontFamily:'Times',
        textAlign:'center'
      
    
      },
      bodytext:{
        justifyContent:'center',
        textAlign:'left',
        marginLeft:20
      },

      buttonStyle: {
        backgroundColor: '#483D8B',
        fontWeight:'bold',
        color: '#FFFFFF',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 40,
        marginBottom: 20,
      },

      buttonTextStyle: {
        color: '#FFFFFF',
        fontWeight:'bold',
        paddingVertical: 10,
        fontSize: 16,
      },
})

export default Prodetails;