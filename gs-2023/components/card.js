import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card({ remedy }) {
  const [disabled, setDisabled] = useState(false);

  if (disabled) {
    return null;
  }

  return (
    <View style={styles.box} aria-hidden={disabled}>
      <View style={styles.line}>
        <Text style={styles.lineText}>Remédio: </Text>
        <Text style={styles.lineText}>{remedy.medication}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.lineText}>Início do tratamento: </Text>
        <Text style={styles.lineText}>{remedy.initDate}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.lineText}>{remedy.text}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          finishOrCancelTreatment(remedy);
          setDisabled(true);
          console.log(disabled);
        }}
      >
        <Text style={styles.buttonText}>Concluir/Cancelar tratamento</Text>
      </TouchableOpacity>
    </View>
  );
}

function finishOrCancelTreatment(remedy) {
  const actualTreatment = JSON.parse(localStorage.getItem(`m-${remedy.cpf}`));
  const arrayTreatment = [];
  actualTreatment.forEach((treatment) => {
    if (treatment.medication !== remedy.medication) {
      arrayTreatment.push(treatment);
    }
  });
  localStorage.setItem(`m-${remedy.cpf}`, JSON.stringify(arrayTreatment));
}

const styles = StyleSheet.create({
  box: {
    borderColor: "#003ce5",
    width: "100%",
    backgroundColor: "#4959ff",
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  line: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  lineText: {
    color: "#ffd435",
    fontWeight: "bold",
    fontSize: "2vh",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#003ce5",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 8,
    right: "0%",
  },
  buttonText: {
    color: "#f0bb0f",
    fontWeight: "bold",
    fontSize: "2vh",
  },
});
