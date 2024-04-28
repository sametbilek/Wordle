import React from 'react'
import { LoginPage, SignupPage, SelectionPage, HomePage } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
       <Stack.Navigator
       initialRouteName='Login'
       screenOptions={{headerShown:false}}>

            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="Signup" component={SignupPage}/>
            <Stack.Screen name="SelectionPage" component={SelectionPage}/>
            <Stack.Screen name="HomePage" component={HomePage}/>
       </Stack.Navigator>
    )
}

export default AuthStack

