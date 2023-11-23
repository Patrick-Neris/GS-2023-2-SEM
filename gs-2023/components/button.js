import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ children, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.button}> {children} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#f0bb0f",
    backgroundColor: "#003ce5",
    fontWeight: "bold",
    fontSize: "4vh",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 16,
  },
});
