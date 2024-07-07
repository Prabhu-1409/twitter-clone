import axios from 'axios'
import React, { useState } from 'react'
import { Dimensions, ScrollView ,SafeAreaView, StyleSheet, TextInput, View, Text, Button, Pressable } from 'react-native'
// import DatePicker from 'react-native-date-picker';

function Signup({navigation}) {
    const [name,setname] = useState(null)
    const [email,setemail] = useState(null)
    const [password ,setpassword] = useState(null)
    const [repassword , setrepassword] = useState(null)
    const [message,setmessage] = useState()
    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const handlesignup = async () =>{
            if(name===null || email===null || password===null || repassword===null){
                setmessage("Fill all the fields")
            }else if(!regex.test(password)){
                setmessage("At least one lowercase alphabet i.e. [a-z] * At least one uppercase alphabet i.e. [A-Z] * At least one Numeric digit i.e. [0-9] * At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’] * Also, the total length must be in the range [8-15]")
            }
            else if(password!==repassword){
                setmessage("Password is incorrect")
            }
            else{
                setmessage("")
                const User_data = {
                    "name":name,
                    "email":email,
                    "password":password
                }
                //console.log(User_data)
                await axios.post('https://twitterclone-2-npvt.onrender.com/signup',User_data).then((success)=>{
                    //console.log(success.data)
                    if(success.data.status===200){
                        navigation.navigate('login')
                        setname(null)
                        setemail(null)
                        setpassword(null)
                        setrepassword(null)
                    }else if(success.data.status===302){
                        setmessage("Email already exist, please login")
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            //console.log(name)
        }
    }
  return (
    <SafeAreaView style={styles.signuppage}>
    <ScrollView>
    <View style={styles.textcontainer}>
    <Text style={styles.text}>Create your Account</Text>
    </View>
    <View style={styles.container}>
        <View style={styles.inputcontainer}>
            <TextInput style={styles.inputs} value={name} onChangeText={(e)=>setname(e)} placeholder='Enter Your Name' placeholderTextColor={"grey"}>
            </TextInput>
            <TextInput style={styles.inputs} value={email} onChangeText={(e)=>setemail(e)} placeholder='Enter Your EmailID or Mobile Number' placeholderTextColor={"grey"}>
            </TextInput>
            <TextInput style={styles.inputs} value={password} onChangeText={(e)=>setpassword(e)} secureTextEntry={true} placeholder='Enter Your Password' placeholderTextColor={"grey"}>
            </TextInput>
            <TextInput style={styles.inputs} value={repassword} onChangeText={(e)=>{setrepassword(e)}} secureTextEntry={true} placeholder='Re-Enter your password' placeholderTextColor={"grey"}>
            </TextInput>
            {/* <DatePicker mode='date'></DatePicker> */}
        </View>
        <View style={styles.buttoncontainer}>
            <Pressable onPress={handlesignup} style={styles.button}>
            <Text style={styles.signup}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={()=>{
                navigation.navigate('login')
            }}>
            <View style={styles.signinbutton}>
            <Text style={styles.signintext}>Already You an Account?</Text>
            </View>
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
    warning:{
        color:'red'
    },
    container:{
        marginTop:150
    }
})

export default Signup
