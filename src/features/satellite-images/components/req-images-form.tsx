
import { z } from "zod"

import { Map } from "./map";

import { DateInput, Form, Input } from "@/src/components/ui/form";

const reqImagesSchema = z.object({
    startDate: z.date().transform((date) => date.toISOString()),
    endDate: z.date().transform((date) => date.toISOString()),
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
            submitText="Buscar Imagens"
        >
            {({ control, setValue }) => (
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
                        control={control}
                        name="bbox"
                        label="BBox"
                        className="hidden"
                    />
                    <Map setValue={setValue}/>
                </>
            )}
        </Form>
    );
};

export { ReqImagesForm };