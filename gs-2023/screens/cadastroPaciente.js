import { StyleSheet, Text, View } from "react-native";
import Input from "../components/input";
import { useState } from "react";
import Button from "../components/button";
import { validate } from "../utils/validate";

export default function CadastroPaciente({ navigation }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [error, setError] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>
          Preencha os dados para cadastrar um paciente
        </Text>
        <Text style={styles.text}>{error}</Text>
        <View style={styles.label}>
          <Text style={styles.text}>Nome:</Text>
          <Input value={name} onChangeText={setName} maxLength={40} />
          <Text style={styles.text}>CPF:</Text>
          <Input
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
            maxLength={11}
            placeholder="Somente números"
          />
        </View>
        <View style={styles.label}>
          <Text style={styles.text}>Endereço:</Text>
          <Input value={address} onChangeText={setAddress} maxLength={160} />
        </View>
        <View style={styles.label}>
          <Text style={styles.text}>ID:</Text>
          <Input value={id} onChangeText={setId} maxLength={5} />
          <Text style={styles.text}>Telefone:</Text>
          <Input
            value={cellphone}
            onChangeText={setCellphone}
            maxLength={13}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button
        onPress={() => {
          const patient = {
            name,
            cpf,
            address,
            id,
            cellphone,
          };
          console.log(patient);
          console.log(validate(patient));
          if (!validate(patient)) {
            setError("Dados inválidos.");
            console.log("Erro");
            return;
          }
        }}
      >
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfac00",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#4959ff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    color: "#f0bb0f",
    fontWeight: "900",
    fontSize: "4vh",
    paddingBottom: 25,
  },
  label: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    padding: 2,
    paddingBottom: 20,
    columnGap: 10,
  },
  text: {
    color: "#ffd435",
    fontSize: "2vh",
    fontWeight: "500",
  },
});
