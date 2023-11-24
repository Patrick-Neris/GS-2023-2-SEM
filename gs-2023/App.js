import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import CadastroPaciente from "./screens/cadastroPaciente";
import CadastroMedicamento from "./screens/cadastroMedicamento";
import Acompanhamento from "./screens/Acompanhamento";
import { populateLocalStorage } from "./utils/populateLocalStorage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./screens/login";

const Stack = createNativeStackNavigator();

export default function App() {
  populateLocalStorage();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />
          <Stack.Screen
            name="CadastroMedicamento"
            component={CadastroMedicamento}
          />
          <Stack.Screen name="Acompanhamento" component={Acompanhamento} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
