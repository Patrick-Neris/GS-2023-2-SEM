import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import CadastroPaciente from "./screens/cadastroPaciente";
import CadastroMedicamento from "./screens/cadastroMedicamento";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />
        <Stack.Screen
          name="CadastroMedicamento"
          component={CadastroMedicamento}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
