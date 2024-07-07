import axios from 'axios'
import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet, Dimensions, TextInput, View, Pressable, ScrollView } from 'react-native'

function Login({navigation}) {
    const[email,setemail] = useState(null)
    const[password,setpassword] = useState(null)
    const [message,setmessage] = useState("")
    const [user,setuser] = useState()
    const loginhandle = async () =>{
        if(email===null || password===null){
            setmessage("Fill all the fields")
        }else{
            setmessage("")
            const user_Data = {
                "email":email,
                "password":password
            }
            await axios.post('https://twitterclone-2-npvt.onrender.com/login',user_Data).then((success)=>{
                console.log(success.data)
                    if(success.data.status===302){
                        setemail(null)
                        setpassword(null)
                        setmessage("")
                        //setuser(success.data.message)
                        navigation.navigate('home',{
                            user:success.data.message
                        })
                    }else if(success.data.status===401){
                        setmessage(success.data.message)
                    }else if(success.data.status===404){
                        setmessage(success.data.message)
                    }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
  return (
    <SafeAreaView style={styles.signuppage}>
    <ScrollView>
    <View style={styles.textcontainer}>
    <Text style={styles.text}>Login</Text>
    </View>
    <View style={styles.container}>
        <View style={styles.inputcontainer}>
            <TextInput style={styles.inputs} value={email} onChangeText={(e)=>setemail(e)} placeholder='Enter Your EmailID or Mobile Number' placeholderTextColor={"grey"}>
            </TextInput>
            <TextInput style={styles.inputs} value={password} onChangeText={(e)=>setpassword(e)} secureTextEntry={true} placeholder='Enter Your Password' placeholderTextColor={"grey"}>
            </TextInput>
            {/* <DatePicker mode='date'></DatePicker> */}
        </View>
        <View style={styles.buttoncontainer}>
            <Pressable style={styles.button} onPress={loginhandle}>
            <Text style={styles.signup}>Sign In</Text>
            </Pressable>
            <Pressable onPress={()=>{
              navigation.navigate('signup')
            }} style={styles.signinbutton}>
            <Text style={styles.signintext}>New User?</Text>
            </Pressable>
            <View>
                <Text style={styles.warning}>{message}</Text>
            </View>
        </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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

export default Login
