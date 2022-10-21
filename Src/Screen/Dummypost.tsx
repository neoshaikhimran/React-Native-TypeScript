
import React, { useEffect, useState, } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet,Image,Text,SafeAreaView,ScrollView,FlatList,TouchableOpacity} from 'react-native'



const Dummypost = () => {
 
  const [data, setData] = useState([])  
  const navigation = useNavigation();
  
   
  useEffect(()=>{
    fetchdashboarddata()
  },[])
      
      const fetchdashboarddata = async()=> {
      const getdashboarddata = fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then(res => setData(res.slice(0,10)))
          console.log(data,'KSgdjHgdj')
           
      }

      const renderItem = ({ item}) =>{

    
        console.log('itemADFAF',item);
        const {id,title,userID,body}=item;
        
       return(
         <TouchableOpacity onPress={() => navigation.navigate('Postdetail',{
          name:item.title,
          id:item.id,
          body:item.body,

         })}>
            
         <View  style={styles.cardViewone}>
           
           <View>
                <Text style={styles.title}>{id} {title}</Text>
                <Text style={styles.bodytext}>{body}</Text>
         </View>
       
         
         </View>
         </TouchableOpacity>
         
         )
       }
        
    return (
                  
            <View style={styles.maincontain} >
                    <View style={styles.headeing}>
                    <Image source={require("../assets/shark.jpeg")} style={styles.image}/>
 
                    <Text style={styles.headingtext}>
                        Dummy Post
                    </Text>
                    </View>
                <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        
                      />
            </View>
                       
    );
    };

const styles = StyleSheet.create({
    maincontain:{
        backgroundColor:'#F0F8FF',
        justifyContent:'center',
        alignContent:'center'
    },
    headingtext:{
        fontSize:29,
        fontWeight:'bold',
        color:'#483D8B'
        
    },
    headeing:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height:70,
        width:100,
        borderRadius:100
    },
 
  cardViewone: {
    width: 375,
    height:  200,
    backgroundColor:'#87CEFA',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    flexDirection:'row',
    alignItems:'center',
    

},

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

})

export default Dummypost;











