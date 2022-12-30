import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native"
import TodoPage from "./pages/TodoPage"

export default function App() {
  return (
    <SafeAreaView>
      <TodoPage />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
