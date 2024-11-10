import { cnMerge } from "@/src/utils/cnMerge";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import { z, ZodType } from "zod";
import { Button } from "@/src/components/ui/button";

type FormProps<TFormValues extends FieldValues, Schema> = {
    onSubmit: SubmitHandler<TFormValues>;
    schema: Schema;
    options?: UseFormProps<TFormValues>;
    className?: string;
    children: (methods: UseFormReturn<TFormValues>) => ReactNode;
    submitText?: string;
}

const Form = <
    Schema extends ZodType<any, any, any>,
    TFormValues extends FieldValues = z.infer<Schema>
>({
    onSubmit,
    schema,
    options,
    className,
    children,
    submitText = "Enviar"
}: FormProps<TFormValues, Schema>) => {

    const formMethods = useForm({
        ...options,
        resolver: zodResolver(schema)
    })

    return (
        <FormProvider {...formMethods}>
            <View
                className={cnMerge(className)}
            >
                {children(formMethods)}
                {/* <Button
                    onPress={formMethods.handleSubmit(onSubmit)}
                    title={submitText}
                /> */}
                <Button
                    variant="primary"
                    onPress={formMethods.handleSubmit(onSubmit)}
                >
                    {submitText}
                </Button>
            </View>
        </FormProvider>
    )
}

export { Form };