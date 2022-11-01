
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
  Alert,
  
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from "../Auth/config";
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton,Checkbox, Modal } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
 



const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checked, setChecked] = useState();
  const [userEmail, setUserEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userErr,setUserErr]=React.useState(false);
  const [userErrlast,setUserErrLast]=React.useState(false);
  const [userErrone,setUserErrone]=React.useState(false);
  const [userErrtwo,setUserErrtwo]=React.useState(false);
  const [eamilErr,setEmailErr]=React.useState(false);
  const [passErr,setPassErr]=React.useState(false);
  const [conpasserror, setConpasserror]=React.useState(false)
  const [value, setValue] = useState(null);
  const[ShowModal, setShowModal]=useState(false);
  const [datetext, setDateText] = useState('');
  
 
  const data = [
    { label: 'SSC', value: '1' },
    { label: 'HSC/Diploma', value: '2' },
    { label: 'Graduate', value: '3' },
    { label: 'Post Graduate', value: '4' },

  ];
    
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

  const checkempty =()=>{
    if(userEmail===" ")
    {
      console.log("Please fill the detail")
    }
  }
  const showDatePicker = () => {
    setShowModal(true);
  };

  const hideDatePicker = () => {
    setShowModal(false);
  };

  const handleConfirm = date=> {
    let current = new Date();
    let todaysDate =
      current.getDate() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getFullYear();

    let dateTimeString =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    if (todaysDate === datetext) {
      setDateText('');
      Alert.alert('Date of birth should be less than current date');
    } else {
      setDateText(dateTimeString);
    }

    hideDatePicker();
  };
  //----Form Vlidation---//
  function firstNamecheck(e){
    let reg=/[^a-z]/gi;

   setFirstName(e);
   if(reg.test(e)){

    setUserErrone(true)
      console.log('true')


   }
   else{
    setUserErrone(false)
      console.log('false')
   }
   if (firstName.length >=3)
     
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
  function LastNamecheck(f){
    let reg=/[^a-z]/gi;
    

    setLastName(f);
    if(reg.test(f)){

      setUserErrtwo(true)
        console.log('true')
  
  
     }
     else{
      setUserErrtwo(false)
        console.log('false')
     }
      if (lastName.length > 3)
      
     {
       setUserErrLast(false)
       console.log('false')
     }
     else
     {
       setUserErrLast(true)
       console.log('true')
         
     }
 
   }
   //-----email validation-----/
   function userEmailcheck(j){
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
 
    setUserEmail(j);
    if (re.test(j) || regex.test(j))
      
     {
       setEmailErr(false)
       console.log('false')
     }
     else
     {
       setEmailErr(true)
       console.log('true')
         
     }
   }
//----passsword validation-----//
   function passwordHandler(i){
  
    let reggexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    setUserPassword(i)
    if (reggexp.test(i))
    {
      setPassErr(false)
      console.log(false)
    }
    else
    {
      setPassErr(true)
      console.log(true)
       
    }
}

function confirmpasscheck(k){
  console.log(k,"Demekdks")
  setConfirmPassword(k)
  if(confirmPassword !== userPassword){
    setConpasserror(false)
    console.log(false)
  }
  else
  {
    setConpasserror(true)
    console.log(true)
    console.log(userPassword,"SSSSS")
    
    
  }
}


      return (
        <ScrollView>
   
        <KeyboardAvoidingView enabled>
           <View style={styles.headeing}>
           <Image source={require("../assets/shark.jpeg")} style={styles.image}/>
 
            <Text style={styles.headingtext}>
                 Registration Form
            </Text>
           </View>

           <Text style={styles.Labletext}>First Name *</Text>
          <View style={styles.SectionStyle}>
            
          <Icon name="user" size={25} color="#00008B" style={styles.icon}/>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(e)=>firstNamecheck(e)}
              placeholder="Enter your First Name here"
              placeholderTextColor="#00008B"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text>{userErr?<Text style={styles.Errortext}>First Name Should be more than 3 Character</Text>:""}</Text> 
          <Text>{userErrone? <Text style={styles.Errortext}>Please Enter Only Characters</Text>:" "}</Text>
          <Text style={styles.Labletext}>Last Name *</Text>
          <View style={styles.SectionStyle}>
          <Icon name="user" size={25} color="#00008B" style={styles.icon}/>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(f)=>LastNamecheck(f)}
              placeholder="Enter your Last Name here"
              placeholderTextColor="#00008B"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text>{userErrlast?<Text style={styles.Errortext}>Last Name Should be more than 3 Character</Text>:""}</Text>
          <Text>{userErrtwo? <Text style={styles.Errortext}>Please Enter Only Characters</Text>:" "}</Text>
          <Text style={styles.Labletext}>Phone Number *</Text>
          <View style={styles.SectionStyle}>
          <Icon name="phone" size={25} color="#00008B" style={styles.icon}/>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(phoneno) => setPhoneno(phoneno)}
              placeholder="Enter your 10 digit Phone Number"
              placeholderTextColor="#00008B"
              keyboardType="numeric"             
              maxLength={10}
            />
          </View>
          <Text style={styles.Labletext}>Email *</Text>
          <View style={styles.SectionStyle}>
          <Icon name="envelope" size={25} color="#00008B" style={styles.icon}/>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(j)=>userEmailcheck(j)}
              placeholder="your email goes here"
              placeholderTextColor="#00008B"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text>{eamilErr?<Text style={styles.Errortext}>Please type Valid Email address</Text>:""}</Text>
          
          
          <Text style={styles.Labletext}>Gender</Text>
          
          <View style={styles.Radio}>
              
              
              <Text style={styles.gender}>Male</Text>
              <RadioButton
                value="Male"
                color="#00008B"
                status={ checked === 'Male' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('Male')}
              />
              <Text style={styles.gender}>Female</Text>
              <RadioButton
                value="Female"
                color="#00008B"
                status={ checked === 'Female' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('Female')}
              />
         </View>
         <Text style={styles.Labletext}>Password *</Text>
          <View style={styles.SectionStyle}>
          <Icon name="lock" size={25} color="#00008B" style={styles.icon}/>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(i) =>
                passwordHandler(i)
              }
              placeholder="Password"
              placeholderTextColor="#00008B"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <Text>{passErr?<Text style={styles.Errortext}>"Please type valid Password (Only accept characters, number and special character, required 1 min 
number, special character, required)"</Text>:""}</Text> 
          <Text style={styles.Labletext}>Confirm Password</Text>
          <View style={styles.SectionStyle}>
          <Icon name="lock" size={25} color="#00008B" style={styles.icon}/>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(k) =>
                confirmpasscheck(k)
              }
              placeholder="Password"
              placeholderTextColor="#00008B"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <Text>{conpasserror?<Text style={styles.Errortext}>"Password Does Not Match"</Text>:""}</Text> 
          <Text style={styles.Labletext}>Education * </Text>
          <View style={styles.SectionStyle}>
           
          <Dropdown
                  style={styles.dropdown}
                  data={data}
        
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Your Qualification"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
                 
                  data={data}
                  
            />
         
          </View>
          <Text style={styles.Labletext}>Date Of Birth</Text>
          <View style={styles.SectionStyle}>
          
           <TouchableOpacity onPress={()=> showDatePicker()}>
            <Text>
              {datetext}
            </Text>
          
          
           <DateTimePickerModal
                      isVisible={ShowModal}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
          </TouchableOpacity>

          </View>
          
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => registerUser(userEmail, userPassword , firstName ,userAddress,userAge)}
           // onPress={()=>checkempty}
            >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
  );
};
export default Register;
 
const styles = StyleSheet.create({
    headeing:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:50

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
    flexDirection:'row',
    height: 52,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    marginVertical:40,
    borderBottomWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderTopWidth:2,
    borderColor:'#00008B'
    },
    icon:{
      margin:11,
    },
  buttonStyle: {
    backgroundColor: '#483D8B',
    fontWeight:'bold',
    color: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop:30
    
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontWeight:'bold',
    paddingVertical: 15,
    fontSize: 16,
  },
  inputStyle: {
  
    paddingLeft: 15,
    paddingRight: 15,
    height:50
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  Radio:{
    flexDirection:'row',
  alignItems:'center',
  marginLeft:20
  //justifyContent:'center',
  
  },
  gender:{
    fontSize:15,
    color:'black',
    paddingLeft:20,
    fontWeight:'bold'
  },
  Labletext:{
    marginLeft:35,
    fontWeight:'bold',
    fontSize:15,
    color:'black',
  },
  dropdown: {
    margin: 16,
    height: 10,
    width:320,
  },
  Errortext:{
    color:'red',
    fontSize:15,
    fontWeight:'bold',
    
    
  }
 
});