import { ImageBackground, StyleSheet, View } from "react-native";
import background from "../images/remedios-amarelo.jpg";
import Button from "../components/button";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Button onPress={() => navigation.navigate("CadastroPaciente")}>
            Cadastrar Paciente
          </Button>
          <Button onPress={() => navigation.navigate("CadastroMedicamento")}>
            Cadastrar Medicamento
          </Button>
          <Button>Acompanhamento</Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
});
