
import { z } from "zod"

import { DateInput, Form, Input } from "@/src/components/ui/form";

const reqImagesSchema = z.object({
    startDate: z.string().min(1, { message: 'Obrigatório' }),
    endDate: z.string().min(1, { message: 'Obrigatório' }),
    bbox: z.string().min(1, { message: 'Obrigatório' }),
})

export type ReqImagesFormValues = z.infer<typeof reqImagesSchema>

type ReqImagesFormProps = {
    onSubmit: (data: ReqImagesFormValues) => void;
}

const ReqImagesForm = ({ onSubmit }: ReqImagesFormProps) => {

    return (
        <Form
            onSubmit={onSubmit}
            schema={reqImagesSchema}
            className="bg-neutral-700/70 flex flex-col p-4 rounded-lg gap-5 border border-neutral-600"
        >
            {({ register, formState: { errors }, control }) => (
                <>
                    <DateInput
                        control={control}
                        name="startDate"
                        label="Data Início"
                        editable
                    />
                    <DateInput
                        control={control}
                        name="endDate"
                        label="Data Final"
                        editable
                    />
                    <Input
                        registration={register('bbox')}
                        error={errors.bbox}
                        className="hidden"
                    />
                    {/* <Map /> */}
                </>
            )}
        </Form>
    );
};

export { ReqImagesForm };