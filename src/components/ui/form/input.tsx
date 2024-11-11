import React from "react";
import { Control, Controller, FieldValues, Path, UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper } from "./field-wrapper";

import { cnMerge } from "@/src/utils/cnMerge";
import { TextInput, TextInputProps } from "react-native";


type InputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
} & TextInputProps;

const Input = <T extends FieldValues>({ control, name, label, className, editable = true, ...props }: InputProps<T>) => {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FieldWrapper label={label} error={error}>
                    <TextInput
                        className={cnMerge(className, 'w-full bg-neutral-600/30 text-neutral-100 px-4 py-2 rounded-lg focus:border focus:border-primary-500 focus:outline-none focus:ring-0', !editable ? 'bg-neutral-600' : '')}
                        value={value}
                        onChangeText={onChange}
                        {...props}
                    />
                </FieldWrapper>
            )}
        />
    );
}

export { Input };