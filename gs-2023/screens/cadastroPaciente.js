import { StyleSheet, Text, View } from "react-native";
import Input from "../components/input";
import { useState } from "react";
import Button from "../components/button";
import { validate } from "../utils/validate";
import { Modal } from "../components/modal";

export default function CadastroPaciente({ navigation }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleModal() {
    setIsModalVisible(() => !isModalVisible);
  }

  return (
    <>
      <View style={styles.container}>
        <Button style={styles.text} onPress={() => navigation.navigate("Home")}>
          Voltar a página inicial
        </Button>
        <View style={styles.form}>
          <Text style={styles.title}>
            Preencha os dados para cadastrar um paciente:
          </Text>
          <Text style={styles.textError}>{error}</Text>
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
            <Text style={styles.text}>Idade:</Text>
            <Input
              value={age}
              onChangeText={setAge}
              maxLength={3}
              placeholder="Somente números"
            />
            <Text style={styles.text}>Telefone:</Text>
            <Input
              value={cellphone}
              onChangeText={setCellphone}
              maxLength={13}
              keyboardType="numeric"
              placeholder="Somente números"
            />
          </View>
        </View>
        <Button
          onPress={() => {
            setError(undefined);
            const patient = {
              type: "patient",
              name,
              cpf,
              address,
              age,
              cellphone,
            };
            const validation = validate(patient);
            if (!validation.validated) {
              setError(validation.error);
              return;
            }

            localStorage.setItem(patient.cpf, JSON.stringify(patient));
            handleModal();
          }}
        >
          Cadastrar
        </Button>
      </View>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Paciente cadastrado!" />
          <Modal.Footer>
            <Button onPress={handleModal}>Entendido</Button>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </>
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
  textError: {
    color: "#ffd435",
    fontSize: "2vh",
    fontWeight: "500",
    paddingBottom: 30,
  },
});
