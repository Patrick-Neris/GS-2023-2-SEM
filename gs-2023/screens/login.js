import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/button";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  async function handleLogin() {
    if (await login({ email, senha })) {
      navigation.navigate("Home");
    } else {
      setError("Usuário ou senha inválidos.");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../images/pilula-login.jpg")}
      />

      <Text style={styles.title}>Acompanhamento de Pacientes</Text>

      <Text style={styles.error}>{error}</Text>

      <TextInput
        style={styles.input}
        placeholder="e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button onPress={handleLogin}>Entrar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#003ce5",
    fontSize: "4vh",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  button: {
    backgroundColor: "#121A2C",
    color: "#FFBA26",
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  image: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  input: {
    backgroundColor: "#003ce5",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    color: "#ffd435",
    width: "auto",
    marginBottom: 10,
  },
  error: {
    color: "#4959ff",
    fontSize: "2vh",
    fontWeight: "500",
    paddingBottom: 15,
  },
});
