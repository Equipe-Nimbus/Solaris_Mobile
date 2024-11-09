import { FieldError } from "react-hook-form";

import { Label } from "./label";
import { Error } from "./error";
import { View } from "react-native";

type FieldWrapperProps = {
    label?: string;
    className?: string;
    children: React.ReactNode;
    error?: FieldError | undefined;
}

export type FieldWrapperPassThroughProps = Omit<
    FieldWrapperProps,
    'className' | 'children'
>;

const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => {
    return (
        <View className="flex flex-col gap-2 text-small">
            {label && <Label>{label}</Label>}
            <View>{children}</View>
            <Error errorMessage={error?.message} />
        </View>
    )
}

export { FieldWrapper };