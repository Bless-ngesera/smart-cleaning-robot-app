import { View, Text, Switch } from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }: any) {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        navigation.replace("Login");
    };

    return (
        <View className={`flex-1 p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <Text
                className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-black"
                }`}
            >
                Profile & Settings
            </Text>

            {/* Account Section */}
            <View className="mb-6">
                <Text
                    className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                    Account
                </Text>
                <Button title="Logout" onPress={handleLogout} variant="danger" />
            </View>

            {/* Preferences Section */}
            <View className="mb-6">
                <Text
                    className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                    Preferences
                </Text>
                <View className="flex-row items-center justify-between mb-4">
                    <Text className={darkMode ? "text-gray-200" : "text-gray-700"}>
                        Dark Mode
                    </Text>
                    <Switch value={darkMode} onValueChange={toggleDarkMode} />
                </View>
            </View>
        </View>
    );
}
