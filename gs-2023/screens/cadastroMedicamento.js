import PickerList from "../components/picker";
import { StyleSheet, Text, View, Picker } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/button";
import { validate } from "../utils/validate";
import axios from "axios";
import { DatePickerInput } from "react-native-paper-dates";
import Input from "../components/input";

export default function CadastroMedicamento({ navigation }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [medication, setMedication] = useState("");
  const [medicationList, setMedicationList] = useState("");
  const [time, setTime] = useState("");
  const [timetable, setTimetable] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [measurementList, setMeasurementList] = useState("");
  const [period, setPeriod] = useState("");
  const [date, setDate] = useState("");
  const [formatedDate, setFormatedDate] = useState("");
  const [error, setError] = useState("");
  const [treatment, setTreatment] = useState("");
  const [treatmentSchedule, setTreatmentSchedule] = useState("");
  const [interval, setInterval] = useState("");
  const [intervalMeasurement, setIntervalMeasurement] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/remedios")
      .then((resp) => setMedicationList(resp.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/horarios")
      .then((resp) => setTimetable(resp.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/quantidade")
      .then((resp) => setMeasurementList(resp.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/periodos")
      .then((resp) => setTreatmentSchedule(resp.data));
  }, []);

  const patients = getPatients();

  const allCpf = [];
  patients.forEach((patient) => {
    allCpf.push(patient.cpf);
  });

  const allNames = [];
  patients.forEach((patient) => {
    allNames.push(patient.name);
  });

  return (
    <>
      <View style={styles.container}>
        <Button style={styles.text} onPress={() => navigation.navigate("Home")}>
          Voltar a página inicial
        </Button>
        <View style={styles.form}>
          <Text style={styles.title}>
            Preencha os dados para cadastrar uma medicação a ser tomada:
          </Text>
          <Text style={styles.textError}>{error}</Text>
          <View style={styles.label}>
            <Text style={styles.text}>CPF:</Text>
            <PickerList
              style={styles.shortLabel}
              selectedValue={cpf}
              onValueChange={(item) => {
                setCpf(item);
                patients.forEach((patient) => {
                  patient.cpf == item ? setName(patient.name) : null;
                });
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
            <Text style={styles.text}>Nome: {name}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>Medicamento:</Text>
            <PickerList
              selectedValue={medication}
              onValueChange={setMedication}
            >
              {Object.values(medicationList).map((pill, index) => (
                <Picker.Item key={index} label={pill} value={pill} />
              ))}
            </PickerList>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>Data de início:</Text>
            <DatePickerInput
              mode={"date"}
              placeholder="Selecione a data"
              onChange={(item) => {
                const formatedDate = `${item.getDate()}/${item.getMonth()}/${item.getFullYear()}`;
                setDate(item);
                setFormatedDate(formatedDate);
              }}
              value={date}
            />
            <Text style={styles.text}>às</Text>
            <PickerList
              selectedValue={time}
              onValueChange={setTime}
              style={styles.shortLabel}
            >
              {Object.values(timetable).map((schedule, index) => (
                <Picker.Item key={index} label={schedule} value={schedule} />
              ))}
            </PickerList>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>Tomar</Text>
            <Input
              value={quantity}
              onChangeText={setQuantity}
              maxLength={4}
              placeholder="Somente números"
            />

            <PickerList
              selectedValue={measurement}
              onValueChange={setMeasurement}
            >
              {Object.values(measurementList).map((measurement, index) => (
                <Picker.Item
                  key={index}
                  label={measurement}
                  value={measurement}
                />
              ))}
            </PickerList>
            <Text style={styles.text}>a cada</Text>
            <Input
              value={interval}
              onChangeText={setInterval}
              maxLength={2}
              placeholder="Somente números"
            />
            <PickerList
              selectedValue={intervalMeasurement}
              onValueChange={setIntervalMeasurement}
            >
              {Object.values(treatmentSchedule).map((treatment, index) => (
                <Picker.Item key={index} label={treatment} value={treatment} />
              ))}
            </PickerList>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>por</Text>
            <Input
              value={period}
              onChangeText={setPeriod}
              maxLength={2}
              placeholder="Somente números"
            />
            <PickerList selectedValue={treatment} onValueChange={setTreatment}>
              {Object.values(treatmentSchedule).map((treatment, index) => (
                <Picker.Item key={index} label={treatment} value={treatment} />
              ))}
            </PickerList>
          </View>
        </View>
        <Button
          onPress={() => {
            setError(undefined);
            const medicationObj = {
              type: "medication",
              cpf,
              name,
              medication,
              formatedDate,
              time,
              quantity,
              interval,
              intervalMeasurement,
              measurement,
              period,
              treatment,
            };
            console.log(medicationObj);
            const validation = validate(medicationObj);
            if (!validation.validated) {
              ("");
              setError(validation.error);
              return;
            }

            let savedMedication = localStorage.getItem(`m-${cpf}`);
            savedMedication = JSON.parse(savedMedication);
            if (savedMedication == undefined) {
              savedMedication = [];
            }
            savedMedication.push({
              cpf,
              name,
              medication,
              initDate: `${formatedDate} às ${time}.`,
              text: `Tomar ${quantity} ${measurement} a cada ${interval} ${intervalMeasurement} por ${period} ${treatment}.`,
            });

            console.log(savedMedication);

            // localStorage.setItem(`m-${cpf}`, JSON.stringify(savedMedication));
          }}
        >
          Cadastrar
        </Button>
      </View>
    </>
  );
}

function getPatients() {
  const patients = [];
  const keys = Object.keys(localStorage);

  // Removendo objeto do próprio expo
  const index = keys.indexOf("EXPO_CONSTANTS_INSTALLATION_ID");
  if (index > -1) keys.splice(index, 1);

  for (const key of keys) {
    let item = localStorage.getItem(key);
    item = JSON.parse(item);
    if (item.type === "patient") {
      patients.push({
        name: item.name,
        cpf: item.cpf,
      });
    }
  }
  return patients;
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
    textAlign: "center",
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
    width: "auto",
  },
  textError: {
    color: "#ffd435",
    fontSize: "2vh",
    fontWeight: "500",
    paddingBottom: 30,
  },
  shortLabel: {
    width: "30%",
    backgroundColor: "#003ce5",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    color: "#ffd435",
  },
});
