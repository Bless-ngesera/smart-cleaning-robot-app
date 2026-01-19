import { TouchableOpacity, Text } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
};

export default function Button({
                                   title,
                                   onPress,
                                   variant = "primary",
                                   disabled = false,
                               }: Props) {
    const base = "px-5 py-3 rounded-xl items-center justify-center";

    // Define styles based on variant
    const style =
        variant === "primary"
            ? "bg-blue-600"
            : variant === "secondary"
                ? "bg-gray-200"
                : "bg-red-500";

    const text =
        variant === "primary"
            ? "text-white"
            : variant === "secondary"
                ? "text-gray-800"
                : "text-white";

    const opacity = disabled ? "opacity-50" : "opacity-100";

    return (
        <TouchableOpacity
            className={`${base} ${style} ${opacity}`}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {/* C++ BRIDGE: If button triggers native robot commands,
          connect here via RobotBridge.start(), stop(), etc. */}
            <Text className={`font-semibold ${text}`}>{title}</Text>
        </TouchableOpacity>
    );
}
