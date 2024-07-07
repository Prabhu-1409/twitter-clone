import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import Profile from '../Image/profile.png';
import likenotactive from '../Image/likenotactive.png';
import likeactive from '../Image/likeactive.png';
import commenticon from '../Image/comments.png';
import repost from '../Image/retweet.png';
import postimage from '../Image/post.png';
import axios from 'axios';
import notsaved from '../Image/notsaved.png'
import saved from '../Image/saved.png'


function Post({userdetails,postdata}) {
  const [like, setlike] = useState(false);
  //const [postdata,setpostdata] = useState("")
  const [comment, setcomment] = useState(null)
  const [postcomment,setpostcomment] = useState()
  const [likearray,setlikearray] = useState([])
  const [savedarray,setsavedarray] = useState([])
  const[commentactive,setcommentactive] = useState(false)
  
  const postid = {
    "id":postdata._id
  }
   useEffect(()=>{
    axios.post('https://twitterclone-2-npvt.onrender.com/commentslikes',postid).then((post)=>{
      //console.log(post.data.message[0].comments)
      //console.log(post.data.message[0].comments)
      setsavedarray(post.data.message[0].saved)
      setlikearray(post.data.message[0].likes)
      setpostcomment(post.data.message[0].comments)
    })
  },[postcomment])
  // const userid = {
  //   "id":userdetails._id
  // }
  // useEffect(()=>{
  //   axios.post('http://10.0.2.2:3001/user',userid)
  // },[])


//console.log(postdata.comments)
  const handlelike=async()=>{
    
    // if(like===false){
    //   setlike(true)
    // }else{
    //   setlike(false)
    // }
    //console.log(like)
    const details = {
      postid : postdata._id,
      userid: userdetails._id,
      active:like
    }

    await axios.put('https://twitterclone-2-npvt.onrender.com/likeupdate',details).then((res)=>{
          //console.log(res.data.message.likes)
          setlikearray(res.data.message.likes)
    })
      // axios.get('http://10.0.2.2:3001/likes').then((post)=>{
      //   //console.log(post.data.message[0].comments)
      //   setlikearray(post.data.message[0].likes)
      // })
  }

  const handlecomment = async()=>{
    if(comment!=null){
      const commentdata = {
        "postid":postdata._id,
        "username":userdetails.name,
        "comment":comment
      }
      setcomment("")
        await axios.put('https://twitterclone-2-npvt.onrender.com/comments',commentdata).then((success)=>{
            //console.log(success.data.message)
        }).catch((err)=>{
          console.log(err)
        })
    }
    
  }
  const handlesave =async() =>{
    const data = {
      postid:postdata._id,
      userid:userdetails._id
    }
    await axios.put('https://twitterclone-2-npvt.onrender.com/saved',data).then((res)=>{
      setsavedarray(res.data.message.saved)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <View style={styles.postcontainer}>
      <View style={styles.posttop}>
        <View style={styles.profileimagecontainer}>
        {
          postdata!=""?<Image style={styles.image} source={{uri:postdata.profilepic}}></Image>:
          <Image style={styles.image} source={Profile}></Image>
        }
        </View>
        <View style={styles.text}>
          <View style={styles.container}>
          <View>
            <Text style={styles.postname}>{postdata.profilename}</Text>
            </View>
            <View>
            <Text style={styles.postat}>@{postdata.profilename.replace(" ","").toLowerCase()}</Text>
            </View>
          </View>
          <View style={styles.paragraphcontainer}>
            <Text style={styles.paragraph}>
              {postdata.profileabout}
            </Text>
          </View>
          <View style={styles.paragraphcontainer}>
          <Text style={styles.hashtag}>{postdata.hashtag}</Text>
          </View>
        </View>
      </View>
      {postdata.type!="tweet"?
        <View style={styles.mid}>
        <Image
          source={{uri:postdata.image}}
          resizeMode="cover"
          style={styles.postimage}></Image>
      </View>:
      <></>
      }
      <View style={styles.bottomcontainer}>
        <Pressable
          style={styles.bottom}
          onPress={
            handlelike}>
          <Image
            source={likearray.includes(userdetails._id) ? likeactive : likenotactive}
            style={styles.bottomicons}
            resizeMode="contain"></Image>
          <View style={styles.textcontainer}>
            <Text style={styles.bottomtext}>{likearray && likearray.length}</Text>
          </View>
        </Pressable>
        <Pressable style={styles.bottom} onPress={()=>{
          setcommentactive(!commentactive)
        }}>
          <Image
            source={commenticon}
            style={styles.bottomicons}
            resizeMode="contain"></Image>
          <View style={styles.textcontainer}>
            <Text style={styles.bottomtext}>{postcomment && postcomment.length}</Text>
          </View>
        </Pressable>
        <Pressable onPress={handlesave} style={styles.bottom}>
          <Image
            source={savedarray.includes(userdetails._id)?saved:notsaved}
            style={styles.bottomicons}
            resizeMode="contain"></Image>
          <View style={styles.textcontainer}>
          </View>
        </Pressable>
        <View style={styles.bottom}>
          <Image
            source={repost}
            style={styles.bottomicons}
            resizeMode="contain"></Image>
          <View style={styles.textcontainer}>
            <Text style={styles.bottomtext}>1k</Text>
          </View>
        </View>
      </View>
      <View style={commentactive?styles.commentcontainer:styles.comment_notactive}>
        <View style={styles.commentinputbox}>
          <TextInput
            style={styles.commentinput}
            placeholder="Enter Your Comment"
            value={comment}
            onChangeText={(e)=>setcomment(e)}
            placeholderTextColor={'grey'}></TextInput>
          <Pressable style={styles.commentbutton} onPress={handlecomment}>
            <Image source={postimage} style={styles.bottomicons}></Image>
          </Pressable>
        </View>
        <View style={styles.comments}>
        {
          postcomment && postcomment.map((item,i)=>(
            <View style={styles.commentbox}>
            <View>
              <Image style={styles.commentprofilepicture} resizeMethod='contain' source={Profile}></Image>
            </View>
            <View style={styles.commentscontainer}>
            <Text style={styles.commentprofilename}>{item.name}</Text>
            <Text style={styles.commentcolor}>{item.text}</Text>
            </View>
            </View>
          ))
        }
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  comment_notactive:{
    display:'none'
  },  
  postcontainer: {
    width: '100%',
    borderWidth: 1.5,
    shadowColor:'#171717',
    shadowOffset:[
            {
                width:10,
                height:10
            }]
        ,
    shadowOpacity:0.2,
    shadowRadius:3,
    elevation:5
  },
  posttop: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    padding:10,
    columnGap:10
  },
  postname: {
    color: 'white',
    paddingTop:10,
    paddingLeft:2,
    fontWeight: '700',
    fontSize: 15,
  },
  text: {
    flexDirection: 'column',
    rowGap: 10,
    width:'80%'
  },
  paragraph: {
    color: 'white',
    textAlign:'justify'
  },
  paragraphcontainer: {
    width: '100%',
  },
  profileimagecontainer: {
    width: 'auto',
    paddingRight: 5,
  },
  postimage: {
    width: '100%',
    height: 250,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 5,
  },
  bottomcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  bottomicons: {
    height: 35,
    width: 30,
  },
  bottomtext: {
    color: 'white',
  },
  textcontainer: {
    justifyContent: 'center',
  },
  comments:{
    padding:10,
    paddingTop:25,
    display:'flex',
    flexDirection:'column',
    rowGap:15
  },
  commentinput: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    color: 'white',
  },
  commentcontainer: {
    padding: 10
  },
  commentbutton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentinputbox:{
    display: 'flex',
    flexDirection: 'row',
  },
  commentprofilename:{
    color:'white',
    fontWeight:'800'
  },
  commentprofilepicture:{
    height:25,
    width:25
  },
  commentcolor:{
    color:'white'
  },
  commentscontainer:{
    display:'flex',
    flexDirection:'column',
    rowGap:5
  },
  commentbox:{
    display:'flex',
    flexDirection:'row',
    columnGap:5,
  },
  hashtag:{
    color:'#1DA1F2',
    textAlign:'justify'
  },
  container:{
    display:'flex',
    flexDirection:'row',
    columnGap:10
  },
  postat: {
    color: 'grey',
    paddingTop:10,
    paddingLeft:2,
    fontWeight: '600',
    fontSize: 13,
  },
});

export default Post;
