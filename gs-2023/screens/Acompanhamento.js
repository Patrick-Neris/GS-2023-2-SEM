import {
  StyleSheet,
  View,
  Picker,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getPatients } from "../utils/getPatients";
import PickerList from "../components/picker";
import { useState } from "react";
import Card from "../components/card";
import { getAllMedicine } from "../utils/getAllMedicine";

export default function Acompanhamento({ navigation }) {
  const [selectedCpf, setSelectedCpf] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [allMedication, setAllMedication] = useState([]);

  const patients = getPatients();
  const allCpf = ["Selecione"];
  patients.forEach((patient) => {
    allCpf.push(patient.cpf);
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.select}>
            <Text style={styles.text}>
              Selecione o CPF que deseja consultar:
            </Text>
            <PickerList
              style={styles.shortLabel}
              selectedValue={selectedCpf}
              onValueChange={(item, value) => {
                let cpf = "";
                if (value == 0) {
                  return;
                }
                setSelectedCpf(item);
                cpf = item;
                patients.forEach((patient) => {
                  patient.cpf == item ? setSelectedName(patient.name) : null;
                });
                const medication = getAllMedicine(cpf);
                if (!!medication) {
                  setAllMedication(medication);
                } else {
                  setAllMedication([]);
                }
              }}
            >
              {allCpf.map((patientCpf, index) => (
                <Picker.Item
                  key={index}
                  label={patientCpf}
                  value={patientCpf}
                />
              ))}
            </PickerList>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Voltar a página inicial</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.screen}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Remédios do paciente {selectedName}:
            </Text>
          </View>
          <View style={styles.cardScreen}>
            <ScrollView style={styles.cards}>
              {allMedication.map((medication) => (
                <Card
                  key={`${medication.cpf}-${medication.medication}`}
                  remedy={medication}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#dfac00",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
    left: "1%",
    textAlign: "center",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#4959ff",
    alignItems: "center",
    position: "absolute",
    top: "0%",
    width: "100%",
    justifyContent: "space-between",
  },
  text: {
    color: "#ffd435",
    fontSize: "2vh",
    fontWeight: "500",
    width: "auto",
    textAlign: "center",
  },
  shortLabel: {
    width: "30%",
    backgroundColor: "#003ce5",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    color: "#ffd435",
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
    marginBottom: 16,
    right: "1%",
  },
  buttonText: {
    color: "#f0bb0f",
    fontWeight: "bold",
    fontSize: "2vh",
  },
  cardScreen: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    padding: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    paddingRight: 10,
  },
  title: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#003ce5",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    top: "0%",
    position: "relative",
  },
  titleText: {
    color: "#f0bb0f",
    fontWeight: "bold",
    fontSize: "2vh",
  },
  screen: {
    width: "100%",
    height: "85%",
    top: "0%",
    position: "relative",
  },
});
