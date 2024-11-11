import React from "react";
import { View, Text, Pressable } from "react-native";
import { cnMerge } from "@/src/utils/cnMerge"; // Adapte caso seja necessário para suas classes com NativeWind

type CheckboxProps = {
    checked: boolean;
    onChange: () => void;
    label?: string;
};

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
    return (
        <Pressable onPress={onChange} className="flex flex-row items-center gap-2">
            <View
                className={cnMerge(
                    "w-4 h-4 border-2 border-primary-500 rounded",
                    checked ? "bg-primary-500 border-primary-500" : "bg-transparent",
                )}
            />
            {label && <Text className="text-base text-neutral-300">{label}</Text>}
        </Pressable>
    );
};

export { Checkbox };
