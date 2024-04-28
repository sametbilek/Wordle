
import {
    StyleSheet,
    Text,
    View,
    Image
   } from 'react-native';
 
   import React, {useState} from 'react';
   import {Loading, CustomTextInput , CustomButton}from '../components/';
   import {useSelector,useDispatch} from 'react-redux';
   import { setIsLoading } from '../redux/userSlice';
   import { login } from '../redux/userSlice';
 const LoginPage = ({navigation}) => {
 
   const [email, setEmail] = useState('') 
   const [password, setPassword] = useState('') 
   const {isLoading} = useSelector((state)=>state.user)
   const dispatch = useDispatch()
   
   const handleLogin = () => {
    dispatch(login({ email, password })).then((response) => {
        if (response.payload.token) {
            navigation.navigate('SelectionPage'); // Giriş başarılı olduğunda SelectionPage'e yönlendirme
        }
    });
};

   return (
     <View style={styles.container}>
        
        <Text style = {styles.welcome}>Welcome</Text>

       <Image
       source = {require('../../assets/images/loginIcon.png')}
       style = {styles.image}/>
       
       <CustomTextInput
       title="Email"
       isSecureText={false}
       OnChangeText={(text)=> setEmail(text)}
       value={email}
       placeholder='Enter Your Email'
       />
       <CustomTextInput
       title="Password"
       isSecureText={true}
       OnChangeText={(password)=> setPassword(password)}
       value={password}
       placeholder='Enter Your Password'
       />
       <CustomButton
       buttonText="Login"
       setWidth="80%"
       handleOnPress={handleLogin}
       buttonColor="blue"
       pressedButtonColor="gray"
       />
       <CustomButton
       buttonText="Sign Up"
       setWidth="30%"
       handleOnPress={()=> navigation.navigate('Signup')}
       buttonColor="gray"
       pressedButtonColor="lightgray"
       />
  
   { isLoading 
   ? <Loading 
   changeIsLoading={()=>dispatch(setIsLoading(false))}/>
   : null }
 
     </View>
   );
 }

 export default LoginPage;
 
 const styles = StyleSheet.create({
   container: {
     flex: 1, 
     backgroundColor: 'lightyellow',
     alignItems: 'center',
     justifyContent: 'center',
   },
   inputContainer:{
    width:'80%',
   },
   image:{
     width:150,
     height:150,
     marginBottom:20,
   },
   welcome:{
     fontWeight:'bold',
     fontSize:30,
     marginBottom:30,
   },
   signupButton:{
    width:'30%',
    height:50,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
   },
 });
 