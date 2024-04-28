import { View, Text, Pressable } from "react-native";
import { keys, ENTER, CLEAR, colors } from "../../constants";
import styles, { keyWidth } from "./Keyboard.styles";
const Keyboard = ({
  onKeyPressed = () => {},
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}) => {
  const isLongButton = (key) => {
    return key === ENTER || key === CLEAR;
  };

  const getKeyBGColor = (key) => {
    const upperCaseKey = key.toUpperCase(); 

    if (greenCaps.includes(upperCaseKey)) {
      return colors.primary;
    }
    if (yellowCaps.includes(upperCaseKey)) {
      return colors.secondary;
    }
    if (greyCaps.includes(upperCaseKey)) {
      return colors.darkgrey;
    }
    return colors.grey;
  };

  return (
    <View style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((keyItem) => (
            <Pressable
              onPress={() => onKeyPressed(keyItem)}
              disabled={greyCaps.includes(keyItem)}
              key={keyItem}
              style={[
                styles.key,
                isLongButton(keyItem) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(keyItem) },
              ]}
            >
              <Text style={styles.keyText}>{keyItem.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;