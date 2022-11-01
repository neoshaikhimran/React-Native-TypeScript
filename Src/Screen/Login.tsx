
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
//import { useNavigation } from "@react-navigation/native";
import { firebase } from "../Auth/config";
 
const Login =({navigation})=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userErr,setUserErr]=React.useState(false);
  const [passErr,setPassErr]=React.useState(false);
  //const navigation = useNavigation();

  function userHandler(e){
   let re = /\S+@\S+\.\S+/;
   let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

   setEmail(e);
   if (re.test(e) || regex.test(e))
     
    {
      setUserErr(false)
      console.log('false')
    }
    else
    {
      setUserErr(true)
      console.log('true')
        
    }
  }

function passwordHandler(f){
  
    let reggexp = /^[a-zA-Z0-9]{8,12}$/;
    if (reggexp.test(f))
    {
       setPassErr(true)
    }
    else
    {
        setPassErr(false)
    }
    setPassword(password)

}



  loginUser = async (email,password) =>{
   

    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
        
      } catch(error){
      
       alert(error.message)
       console.log("Email not accepted")
      
    }
  

  }
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/shark.jpeg")} />
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#00008B"
          onChangeText={(e)=>userHandler(e)}
        />
       
      </View>
      <Text>{userErr?<Text style={styles.Errortext}>user not Valid</Text>:""}</Text>

        
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#00008B"
          secureTextEntry={true}
          onChangeText={(f) =>passwordHandler(f)}
        />
      </View>
      <Text>{passErr?<Text style={styles.Errortext}>Password not Valid</Text>:""}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => loginUser(email,password)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.forgot_button}>Don't Have An Accout ? Please Register</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 80,
    marginTop:40,
  },
 
  inputView: {
    backgroundColor: "#87CEFA",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
   // marginBottom:24
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginTop:10,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#483D8B",
  },
  loginText:{
    backgroundColor:"#483D8B",
    color:'white',
    fontWeight:'bold',
    fontSize:20
  },
  Errortext:{
    color:'red',
    fontSize:15,
    fontWeight:'bold',
    
    
  }
});

export default Login;