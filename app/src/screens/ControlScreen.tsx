import { View, Text, Alert } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ControlScreen = () => {
    const [busy, setBusy] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const { darkMode } = useContext(ThemeContext);

    const startCleaning = async () => {
        setBusy(true);
        setLoadingMessage("Starting cleaning...");
        try {
            // ✅ C++ BRIDGE: Send "start" command to robot
            // Android (JNI): RobotBridge.startCleaning()
            // iOS (Obj-C++): [RobotBridge startCleaning]
            console.log("Start cleaning (mock)");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
        } catch (err) {
            Alert.alert("Error", "Failed to start cleaning.");
        } finally {
            setBusy(false);
        }
    };

    const stopCleaning = async () => {
        setBusy(true);
        setLoadingMessage("Stopping cleaning...");
        try {
            // ✅ C++ BRIDGE: Send "stop" command to robot
            // Android (JNI): RobotBridge.stopCleaning()
            // iOS (Obj-C++): [RobotBridge stopCleaning]
            console.log("Stop cleaning (mock)");
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            Alert.alert("Error", "Failed to stop cleaning.");
        } finally {
            setBusy(false);
        }
    };

    const dockRobot = async () => {
        setBusy(true);
        setLoadingMessage("Returning to dock...");
        try {
            // ✅ C++ BRIDGE: Command robot to return to dock
            // Android (JNI): RobotBridge.returnToDock()
            // iOS (Obj-C++): [RobotBridge returnToDock]
            console.log("Return to dock (mock)");
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            Alert.alert("Error", "Failed to dock robot.");
        } finally {
            setBusy(false);
        }
    };

    if (busy) {
        return <Loader message={loadingMessage} />;
    }

    return (
        <View className={`flex-1 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header title="Control Robot" />

            <View className="p-6 gap-4">
                {/* Main Control Buttons */}
                <Button title="Start Cleaning" onPress={startCleaning} />
                <Button title="Stop Cleaning" onPress={stopCleaning} variant="secondary" />
                <Button title="Return to Dock" onPress={dockRobot} variant="secondary" />

                {/* Manual Controls Section */}
                <View
                    className={`mt-8 rounded-xl p-4 shadow-sm border ${
                        darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-100"
                    }`}
                >
                    <Text
                        className={`font-semibold mb-2 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                    >
                        Manual Controls
                    </Text>
                    {/* ✅ C++ BRIDGE: Implement joystick/directional control here
              Android (JNI): RobotBridge.move(direction, speed)
              iOS (Obj-C++): [RobotBridge moveWithDirection:speed:]
          */}
                    <Text className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        Joystick and advanced controls coming soon…
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ControlScreen;
