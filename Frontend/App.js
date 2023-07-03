import AppNav from "./Routes/AppNav";
import { LogBox } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import { NativeBaseProvider } from "native-base";
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
