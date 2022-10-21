
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { firebase } from '../Auth/config';
import Dummypost from '../Screen/Dummypost';
import Login from '../Screen/Login';
import Prodetails from '../Screen/Postdetail';
import Register from '../Screen/Register';

const Stack = createNativeStackNavigator();

function MyStack () {
  const [initializing, setInitializing ]= useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }
  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);
  if(initializing) return null;

  if(!user){
  return (
    
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}> 
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
  );
  }

  return(
    <Stack.Navigator >
      <Stack.Screen name="Dummypost" component={Dummypost} options={{headerShown: false}} />
      <Stack.Screen name="Postdetail" component={Prodetails} />
    </Stack.Navigator>
  )
}

export default MyStack;