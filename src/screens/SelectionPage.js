import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fiveLetter, sixLetter } from '../words';

const SelectionPage = () => {
    const navigation = useNavigation();

    const handleLetterPress = (letterCount) => {
        const randomIndex = Math.floor(Math.random() * (letterCount === 5 ? fiveLetter.length : sixLetter.length));
        const selectedWord = letterCount === 5 ? fiveLetter[randomIndex] : sixLetter[randomIndex];
        navigation.navigate('Home', { word: selectedWord });
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => handleLetterPress(5)}>
                <Text style={styles.buttonText}>Beş Harf</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleLetterPress(6)}>
                <Text style={styles.buttonText}>Altı Harf</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SelectionPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'lightyellow',
        fontSize: 18,
    },
});
