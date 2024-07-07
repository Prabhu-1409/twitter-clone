import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View, Text, Pressable, ScrollView, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '../Image/profile.png'
import EntypoIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import home from '../Image/home.png'
import bell from '../Image/bell.png'
import search from '../Image/search.png'
import message from '../Image/message.png'
import Post from './Post'
import Settings from '../Image/settings.png'
import axios from 'axios';
import Search from './Search';
import Notifcation from './Notifcation';
import Messages from './Messages';
import edit from '../Image/edit.png'


function Home({navigation,route}) {

    const[active,setactive] = useState('home')
    const [bottomnav, setbottomnav] = useState('all')
    const {user} = route.params
    //const use = "Prabhu"
    const [post_data,setpost_data] = useState()
    const[category,setcategory]= useState('home')
    useEffect(()=>{
        axios.get('https://twitterclone-2-npvt.onrender.com/post').then((post)=>{
          //console.log(post.data.message[0].comments)
          //console.log(post.data.message[0])
          setpost_data(post.data.message)
          //setpostcomment(post.data.message[0].comments)
        })
      },[])

  return (
    <SafeAreaView style={styles.home}>
    <View style={styles.topbar}>
        <View style={styles.profile}>
        <View>
            <Image source={Profile} resizeMode='contain' style={styles.image}></Image>
        </View>
            <View style={styles.textcontainer}>
                <Text style={styles.text}>{user.name}</Text>
                {/* <Text style={styles.text}>Hello</Text>  */}
            </View>
        </View>
        <View style={styles.navbar}>
        <Pressable onPress={()=>{
            setactive('home')
            setcategory('home')
        }} style={active==='home'?styles.iconcontainer:''}>
        <Image source={home} style={styles.icons} resizeMode='contain'></Image>
        </Pressable>
        <Pressable onPress={()=>{
            setactive('search')
            setcategory('search')
        }} style={active==='search'?styles.iconcontainer:''}>
        <Image source={search} style={styles.icons} resizeMode='contain'></Image>
        </Pressable>
        <Pressable onPress={()=>{
            setactive('bell')
            setcategory('bell')
        }} style={active==='bell'?styles.iconcontainer:''}>
        <Image source={bell} style={styles.icons} resizeMode='contain'></Image>
        </Pressable>
        <Pressable onPress={()=>{
            setactive('message')
            setcategory('message')
        }} style={active==='message'?styles.iconcontainer:''}>
        <Image source={message} style={styles.icons} resizeMode='contain'></Image>
        </Pressable>
        </View>
        </View>
        <View style={styles.scroll}>
        {/* <Post userdetails={user} style={styles.postalign}></Post>
        <Post userdetails={user} style={styles.postalign}></Post> */}
            {category==='home'?
                <FlatList style={{width:'100%',paddingLeft:10,paddingRight:10}} contentContainerStyle={{display:'flex',flexDirection:'column',alignItems:'center',rowGap:10}} data={post_data} renderItem={({item})=>
            <Pressable onPress={()=>{
            navigation.navigate('detail',{
                id:item._id,
                userdetails:user
            })
        }}>
        <Post userdetails={user} postdata={item}/>
        </Pressable>
        }>
        </FlatList>:category==='search'?
            <Search></Search>:category==='bell'?
            <Notifcation></Notifcation>:category==='message'?
            <Messages userdetails={user}></Messages>:<></>
            }
        </View>
        <View style={styles.bottomnav}>
            <View style={styles.bottomnavcontainer}>
                <Pressable onPress={()=>{
                    setbottomnav('all')
                }}>
                <Text style={bottomnav==='all'?styles.text_active:styles.text}>ALL</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    setbottomnav('mentions')
                }}>
                <Text style={bottomnav==='mentions'?styles.text_active:styles.text}>MENTIONS</Text>
                </Pressable>
            </View>
            <View>
                <Image source={Settings} style={styles.bottomicons} resizeMode='contain'></Image>
            </View>
        </View>
        <View style={styles.edit}>
        <Image style={styles.editicon} source={edit} resizeMode='contain'></Image>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    home:{
        backgroundColor:'black',
        width:'100%',
        height:'100%',
        paddingTop:10,
        display:'flex',
        flexDirection:'column',
        position:'relative'
    },
    image:{
        height:50,
        width:50,
        borderRadius:50,
    },
    topbar:{
        display:'flex',
        flexDirection:'column',
        height:'auto',
    },
    text:{
        color:'white',
        paddingLeft:10,
        fontSize:20,
        fontWeight:'800'
    },
    profile:{
        columnGap:10,
        flexDirection:'row',
        padding:10,
    },
    textcontainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        flex:1,
        height:'100%'
    },
    navbar:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
        width:'100%',
    },
    icons:{
        height:35,
    },
    iconcontainer:{
        borderBottomWidth:4,
        borderBottomColor:'yellow'
    },
    scroll:{
        position:'relative',
        display:'flex',
        paddingTop:15,
        flexDirection:'column',
        alignItems:'center',
        height:'75%',
        width:'100%'
    },  
    bottomnav:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        marginBottom:'5%'
    },
    bottomnavcontainer:{
        color:'white',
        flexDirection:'row',
        columnGap:25,  
    },
    bottomicons:{
        height:35,
        width:30,
    },
    text:{
        color:'white'
    },
    text_active:{
        color:'#1DA1F2'
    },
    postalign:{
        position:'relative'
    },
    edit:{
        position:'absolute',
        height:'8%',
        width:'16%',
        backgroundColor:'#1DA1F2',
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:60,
        bottom:'10%',
        right:'2%'
    },
    editicon:{
        height:'50%',
        width:'50%'
    }
})
export default Home
