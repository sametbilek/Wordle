import React from 'react'
import { StyleSheet, Text, View , TextInput} from 'react-native'

const CustomTextInput = ({title,isSecureText,OnChangeText,value,placeholder}) => {
    return (
    <View style={styles.inputContainer}>
        <Text style ={styles.inputBoxText}>{title}</Text>
        <TextInput
         secureTextEntry={isSecureText}
         placeholder={placeholder}
         style={styles.textInputStyle}
         onChangeText={OnChangeText}
         value={value}
        />
    </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputContainer:{
        width:'80%',
       },
    inputBoxText:{
        fontWeight:'bold'
       },
     textInputStyle:{
        borderBottomWidth:0.5,
         width:'100%',
         height:50,
         borderRadius:50,
         marginVertical:10,
         alignItems: 'center',
         textAlign: 'center'
       },
})
