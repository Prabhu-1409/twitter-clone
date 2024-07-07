import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions, StyleSheet, TextInput, View, Text, Button, Pressable } from 'react-native'

function Notifcation() {
  return (
    <SafeAreaView>
    <View style={styles.home}>

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
})

export default Notifcation
