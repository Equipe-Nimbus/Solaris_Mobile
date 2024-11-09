import { Text, View } from "react-native"
import { ReqImagesForm, ReqImagesFormValues } from "./req-images-form"

const ReqImageHandler = () => {

    async function handleSubmit(data: ReqImagesFormValues) {
        console.log(data)
    }
    
    return (
        <>
            <View className="w-full py-10 flex flex-col gap-3">
                <Text className="text-neutral-100 text-mheading2 font-bold leading-10">
                    Busca por imagens de
                    <Text className="text-primary-500"> satélite.</Text>
                </Text>
                <Text className="text-base text-neutral-300 leading-6">
                    Selecione um intervalo de datas e uma área de interesse para visualizar imagens de satélite e identificar a cobertura de nuvens.
                </Text>
            </View>

            <View className="flex flex-col gap-20">
                <ReqImagesForm onSubmit={handleSubmit} />
            </View>
        </>
    )
}

export { ReqImageHandler }
