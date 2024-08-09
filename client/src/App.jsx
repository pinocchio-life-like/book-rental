import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { AbilityProvider } from "./contexts/AbilityContext";

function App() {
  return (
    <AuthProvider>
      <AbilityProvider>
        <AppRoutes />
      </AbilityProvider>
    </AuthProvider>
  );
}

export default App;
