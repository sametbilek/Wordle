import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { colors, CLEAR, ENTER } from "../constants";
import Keyboard from '../components/Keyboard/Keyboard';

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
    return [...arr.map((rows) => [...rows])];
}

const HomePage = ({route}) => {
    const [word, setWord] = useState('');
    const [letters, setLetters] = useState([]);
    const [rows, setRows] = useState(new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill("")));
    const [curRow, setCurRow] = useState(0);
    const [curCol, setCurCol] = useState(0);
    const [gameState, setGameState] = useState('playing');

    useEffect(() => {
        if (curRow > 0) {
            checkGameState();
        }
    }, [curRow]);

    useEffect(() => {
        if (route.params && route.params.word) {
            const selectedWord = route.params.word.toUpperCase();
            setWord(selectedWord);
            const selectedLetters = selectedWord.split("");
            setLetters(selectedLetters);
            setRows(new Array(NUMBER_OF_TRIES).fill(new Array(selectedLetters.length).fill("")));
        }
    }, [route.params, NUMBER_OF_TRIES]); 
    
    
    
    useEffect(() => {
        console.log("Letters:", letters);
        console.log("Rows:", rows);
    }, [letters, rows]);

    const checkGameState = () => {
        if (checkIfWon()) {
            Alert.alert("Congratulations", "You won!");
            setGameState("won");
        } else if (checkIfLost()) {
            Alert.alert("Heh", "Try again");
            setGameState("lost");
        }
    };

    const checkIfWon = () => {
        const row = rows[curRow - 1]
        return row.every((letter, i) => letter === letters[i]);
    };

    const checkIfLost = () => {
        return curRow === rows.length;
    };

    const onKeyPressed = (key) => {
        if (gameState !== "playing") {
            return;
        }
        const updatedRows = copyArray(rows);
        const upperCaseKey = key.toUpperCase(); 

        if (upperCaseKey === CLEAR) {
            const prevCol = curCol - 1;
            if (prevCol >= 0) {
                updatedRows[curRow][prevCol] = "";
                setRows(updatedRows);
                setCurCol(prevCol);
            }
            return;
        }
        if (upperCaseKey === ENTER) {
            if (curCol === rows[0].length) {
                setCurRow(curRow + 1);
                setCurCol(0);
            }
        }
        if (curCol < rows[0].length) {
            updatedRows[curRow][curCol] = upperCaseKey;
            setRows(updatedRows);
            setCurCol(curCol + 1);
        }
    }

    const isCellActive = (row, col) => {
        return row === curRow && col === curCol;
    }
    const getCellBGColor = (row, col) => {
        const letter = rows[row][col];
        if (row >= curRow) {
            return colors.black;
        }
        if (letter === letters[col]) {
            return colors.primary;
        }
        if (letters.includes(letter)) {
            return colors.secondary;
        }
        return colors.darkgrey;
    };

    const getAllLetterWithColor = (color) => {
        return rows.flatMap((row, i) =>
            row.filter((cell, j) => getCellBGColor(i, j) === color)
        );
    }

    const greenCaps = getAllLetterWithColor(colors.primary);
    const yellowCaps = getAllLetterWithColor(colors.secondary);
    const greyCaps = getAllLetterWithColor(colors.darkgrey);

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar style="light" />

            <ScrollView style={styles.map}>
                {rows.map((row, i) => (
                    <View key={`row-${i}`} style={styles.row}>
                        {row.map((letter, j) => (
                            <View key={`cell-${i}-${j}`} style={[styles.cell, { borderColor: isCellActive(i, j) ? colors.grey : colors.darkgrey, backgroundColor: getCellBGColor(i, j) },]}>
                                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <Keyboard onKeyPressed={onKeyPressed}
                greenCaps={greenCaps}
                yellowCaps={yellowCaps}
                greyCaps={greyCaps}
            />
        </SafeAreaView>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        alignSelf: 'stretch',
        marginVertical: 20,
    },
    row: {

        alignSelf: 'stretch',
        flexDirection: "row",
        justifyContent: "center"
    },
    cell: {
        borderWidth: 3,
        backgroundColor: colors.darkgrey,
        flex: 1,
        maxWidth: 70,
        aspectRatio: 1,
        margin: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    cellText: {
        color: colors.lightgrey,
        fontWeight: "bold",
        fontSize: 28,
    }

})
