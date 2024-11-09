import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

import { cnMerge } from "@/src/utils/cnMerge";
import { TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps &
    FieldWrapperPassThroughProps & {
        className?: string;
        registration?: Partial<UseFormRegisterReturn>;
    }

const Input = React.forwardRef<TextInput, InputProps>(
    ({ className, label, error, registration, editable, ...props }, ref) => {
        return (
            <FieldWrapper label={label} error={error}>
                <TextInput
                    className={cnMerge(className, 'w-full bg-neutral-600/30 text-neutral-100 px-4 py-2 rounded-lg focus:border focus:border-primary-500 focus:outline-none focus:ring-0', !editable ? 'bg-neutral-600' : '')}
                    ref={ref}
                    editable={editable}
                    {...registration}
                    {...props}
                />
            </FieldWrapper>
        )
    }
)

export { Input };