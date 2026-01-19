import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import "./global.css";

export default function Layout() {
    return (
        <ThemeProvider>
            <AppNavigator />
        </ThemeProvider>
    );
}
