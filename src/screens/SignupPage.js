import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native'
import { CustomTextInput, CustomButton, Loading } from '../components'
import {useDispatch,useSelector} from 'react-redux'
import { register } from '../redux/userSlice'
const SignupPage = ({navigation}) => {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistered, setIsRegistered] = useState(false); 

   
    const dispatch = useDispatch()

    const {isLoading} = useSelector(state=>state.user)
    
    const handleRegister = ()=>{
        dispatch(register({email,password}))
        setIsRegistered(true); 
    }

    if(isLoading){
        return <Loading/>
    }
    return (
        <SafeAreaView style={styles.container}>
        

            <View style={styles.title}>
                <Image style= {styles.image} source={require("../../assets/images/signUpIcon.png")}/>
            <Text style = {styles.signUp}>Sign Up</Text>
            </View>
           <View style={styles.textInputContainer}>
           
            <CustomTextInput
            title="Name"
            isSecureText={false}
            OnChangeText={setName}
            value={name}
            placeholder="Enter Your Name"
            />
             <CustomTextInput
            title="Email"
            isSecureText={false}
            OnChangeText={setEmail}
            value={email}
            placeholder="Enter Your Email"
            />
               <CustomTextInput
            title="Password"
            isSecureText={true}
            OnChangeText={setPassword}
            value={password}
            placeholder="Create Your Password"
            />
            </View>
            <View style={styles.signUpOptions}>
                <CustomButton
                buttonText="Sign Up"
                setWidth="80%"
                buttonColor="blue"
                pressedButtonColor="gray"
                handleOnPress={handleRegister}
                />
                {isRegistered && <Text style={styles.successMessage}>Registration Successful!</Text>}

            <Pressable onPress={()=>navigation.navigate("Login")}>
                <Text style={{fontWeight:'bold'}}>Already have an account? Login</Text>
            </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default SignupPage

const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:"lightyellow"
    },
    signUp:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:30,
    },
    title:{
    flex:2,
    paddingTop:50,
    },
    textInputContainer:{
    flex:2,
    paddingVertical:20,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    },
    signUpOptions:{
    flex:3,
    width:"100%",
    alignItems:"center",
    justifyContent:'space-between'
    },
    image:{
    width:130,
    height:130,
    marginBottom:20,
    },
    successMessage: {
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10,
    }
})
