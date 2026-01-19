import { View, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { FC } from "react";
import type { RootStackParamList } from "../navigation/types";
import { useState } from "react";

type SignupScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const SignupScreen: FC<SignupScreenProps> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            // ✅ Mock signup success
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Save token persistently
            await AsyncStorage.setItem("userToken", "mock-token");

            navigation.replace("Main");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader message="Creating account..." />;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-gray-50"
        >
            <Header title="Sign Up" subtitle="Create your robot account" />

            <View className="flex-1 items-center justify-center px-6">
                <View className="w-full bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <TextInput
                        placeholder="Name"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                        className="border border-gray-300 rounded-xl p-3 mb-4 bg-gray-50"
                    />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        className="border border-gray-300 rounded-xl p-3 mb-4 bg-gray-50"
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        className="border border-gray-300 rounded-xl p-3 mb-6 bg-gray-50"
                    />
                    <Button title="Sign Up" onPress={handleSignup} />
                    <Button
                        title="Back to Login"
                        onPress={() => navigation.navigate("Login")}
                        variant="secondary"
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;
