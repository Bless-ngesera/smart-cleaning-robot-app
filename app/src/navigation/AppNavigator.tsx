import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ControlScreen from "../screens/ControlScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import MapScreen from "../screens/MapScreen";
import Loader from "../components/Loader";
import Button from "../components/Button";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Profile screen with logout option
 */
function ProfileScreen({ navigation }: any) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        navigation.replace("Login");
    };

    return (
        <View className="flex-1 items-center justify-center bg-gray-50">
            <Text className="text-2xl font-bold mb-6">Profile</Text>
            <Button title="Logout" onPress={handleLogout} variant="danger" />
        </View>
    );
}

/**
 * Bottom tab navigator for main app screens
 */
function MainTabs() {
    const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
        Dashboard: "home",
        Control: "play-circle",
        Schedule: "calendar",
        Map: "map",
        Profile: "person-circle",
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const iconName = iconMap[route.name] || "ellipse";
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: "#6b7280",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#e5e7eb",
                    height: 60,
                    paddingBottom: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Control" component={ControlScreen} />
            <Tab.Screen name="Schedule" component={ScheduleScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

/**
 * Root navigator:
 * - Shows Login/Signup if not authenticated
 * - Shows MainTabs if authenticated
 */
export default function AppNavigator() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("userToken");
            setIsAuthenticated(!!token);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return <Loader message="Loading app..." />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainTabs} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}
