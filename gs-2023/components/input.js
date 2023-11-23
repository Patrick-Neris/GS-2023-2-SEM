import { StyleSheet, TextInput } from "react-native";

export default function Input({ ...props }) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#003ce5",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    color: "#ffd435",
    width: "100%",
  },
});
