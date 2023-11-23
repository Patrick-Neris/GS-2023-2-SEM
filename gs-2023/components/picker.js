import { StyleSheet, Picker } from "react-native";

export default function PickerList({ children, ...props }) {
  return (
    <Picker style={styles.picker} {...props}>
      {children}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#003ce5",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    color: "#ffd435",
    width: "100%",
  },
});
