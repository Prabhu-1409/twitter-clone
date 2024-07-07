import axios from 'axios'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, TextInput, View, Text, Button, Pressable, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'

function Messages({userdetails}) {
    const [improvement,setimprovement] = useState(null)
    const [suggestions,setsuggestions] = useState(null)

    const handlefeedback = ()=>{
        const data = {
            "username":userdetails.name,
            "improvement":improvement,
            "suggestion":suggestions
        }
        if(improvement!=null && setsuggestions!=null){
            axios.post('https://twitterclone-2-npvt.onrender.com/feedback',data).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
            setimprovement("")
            setsuggestions("")
        }
        
    }
  return (
    <SafeAreaView>
    <View style={styles.home}>
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.inputcontainer}>
            <TextInput style={styles.inputs} multiline={true} value={improvement} onChangeText={(e)=>setimprovement(e)} numberOfLines={3}  placeholder='Any idea for Improving UI' placeholderTextColor={"grey"}>
            </TextInput>
            <TextInput style={styles.inputs} multiline={true} value={suggestions} onChangeText={(e)=>setsuggestions(e)} numberOfLines={4} placeholder='Suggestions' placeholderTextColor={"grey"}>
            </TextInput>
            {/* <DatePicker mode='date'></DatePicker> */}
        </View>
        <View style={styles.buttoncontainer}>
            <Pressable style={styles.button} onPress={handlefeedback}>
            <Text style={styles.signup}>Submit</Text>
            </Pressable>
            <View>
                <Text style={styles.warning}></Text>
            </View>
        </View>
        </View>
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    home:{
        backgroundColor:'black',
        width:'100%',
        paddingTop:10,
        display:'flex',
        flexDirection:'column',
    },
    signuppage:{
      paddingTop:20,
      backgroundColor:'black',
      width: Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },
  inputs:{
      width:Dimensions.get('window').width - 50,
      borderColor:'#A8A8A8',
      borderWidth:1,
      fontSize:20,
      borderRadius:5,
      color:'white'
  },
  inputcontainer:{
      flexDirection:'column',
      rowGap:15,
      justifyContent:'center',
      // backgroundColor:'red',
      alignItems:'center'
  },
  text:{
      color:'white',
      fontSize:35,
      fontWeight:'700',
  },
  warning:{
        color:'red'
},
  textcontainer:{
      flexDirection:'row',
      justifyContent:'center'
  },
  signup:{
      color:'black',
      fontSize:20,
      fontWeight:'600',
      padding:10
  },
  button:{
      backgroundColor:'white',
      width:Dimensions.get('window').width - 50,
      alignItems:'center',
      borderRadius:25
  },
  buttoncontainer:{
      paddingTop:20,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      rowGap:20
  },
  signinbutton:{
      alignItems:'center',
      justifyContent:'center',
  },
  signintext:{
      color:'white'
  },
  container:{
      marginTop:150
  }
})

export default Messages
