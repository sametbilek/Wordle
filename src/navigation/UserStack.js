import React from 'react'
import { HomePage,ProfilePage, SelectionPage } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{headerShown:false}}>

        <Stack.Screen name="Home" component={HomePage}/>
        <Stack.Screen name="Profile" component={ProfilePage}/>
        <Stack.Screen name="SelectionPage" component={SelectionPage} />
   </Stack.Navigator>
    )
}

export default UserStack

