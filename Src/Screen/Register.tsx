
import React, {useState, } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  
} from 'react-native';
import { firebase } from "../Auth/config";
 

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userErr,setUserErr]=React.useState(false);
  
  registerUser = async (userEmail, userPassword, firstName, userAddress, userAge) => {
   
    await firebase.auth().createUserWithEmailAndPassword(userEmail,userPassword)
    .then(() =>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url:'https://emailotp-c3b17.firebaseapp.com',

      })
      .then(()=>{
        alert('verification email sent')
      }).catch((error)=>{
        alert(error.message)
      })
      .then(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          userEmail,
          userAddress,
          userAge
          
        })
      })
      .catch((error)=>{
        alert(error.message)
      })
    })
    .catch((error =>{
      alert(error.message)
    }))
  

   


  }

      return (
   
        <KeyboardAvoidingView enabled>
           <View style={styles.headeing}>
           <Image source={require("../assets/shark.jpeg")} style={styles.image}/>
 
            <Text style={styles.headingtext}>
                 Registration Form
            </Text>
           </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(firstName) => setFirstName(firstName)}
              placeholder="Enter Name"
              placeholderTextColor="#00008B"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
     
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              placeholder="Enter Email"
              placeholderTextColor="#00008B"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              placeholder="Enter Password"
              placeholderTextColor="#00008B"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserAge(UserAge)}
              placeholder="Enter Age"
              placeholderTextColor="#00008B"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) =>
                setUserAddress(UserAddress)
              }
              placeholder="Enter Address"
              placeholderTextColor="#00008B"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => registerUser(userEmail, userPassword , firstName ,userAddress,userAge)}
            >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
  );
};
export default Register;
 
const styles = StyleSheet.create({
    headeing:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    headingtext:{
        fontSize:25,
        fontWeight:'bold',
        color:'#483D8B'
        
    },
    image:{
        height:70,
        width:100
    },
  SectionStyle: {
    height: 40,
    marginTop: 60,
    marginLeft: 35,
    marginRight: 35,
   
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
    marginTop:30
    
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontWeight:'bold',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    backgroundColor:'#87CEFA',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
 
});