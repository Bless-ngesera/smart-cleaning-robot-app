import { View, Text, Alert } from "react-native";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const MapScreen = () => {
    const [busy, setBusy] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const { darkMode } = useContext(ThemeContext);

    const fetchMap = async () => {
        setBusy(true);
        setLoadingMessage("Fetching robot map...");
        try {
            // ✅ C++ BRIDGE: Render robot’s live map here
            // Android (JNI): RobotBridge.getMap()
            // iOS (Obj-C++): [RobotBridge map]
            // Expect JSON or binary data representing robot’s path and obstacles
            console.log("Fetch map (mock)");
            await new Promise((resolve) => setTimeout(resolve, 1500)); // mock delay
        } catch (err) {
            Alert.alert("Error", "Failed to fetch robot map.");
        } finally {
            setBusy(false);
        }
    };

    if (busy) {
        return <Loader message={loadingMessage} />;
    }

    return (
        <View className={`flex-1 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header title="Robot Map" />

            <View className="flex-1 items-center justify-center p-6">
                {/* Map Placeholder */}
                <View
                    className={`w-full h-80 rounded-xl shadow-sm border items-center justify-center ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                >
                    <Text className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        Map visualization coming soon…
                    </Text>
                </View>

                {/* Info Section */}
                <View className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200 w-full">
                    <Text className="text-blue-700 font-semibold mb-2">Navigation Info</Text>
                    <Text className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        The robot’s path, obstacles, and cleaning zones will be displayed here once integrated.
                    </Text>
                </View>

                {/* Fetch Map Button */}
                <View className="mt-6 w-full">
                    <Text
                        className={`mb-2 font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                    >
                        Actions
                    </Text>
                    <View className="flex-row gap-3">
                        <Button title="Fetch Map" onPress={fetchMap} variant="primary" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MapScreen;
