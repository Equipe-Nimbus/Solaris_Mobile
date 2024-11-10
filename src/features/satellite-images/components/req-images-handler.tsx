import { ScrollView, Text, View } from "react-native"
import { ReqImagesForm, ReqImagesFormValues } from "./req-images-form"
import { reqImages } from "../api/req-images"

const ReqImageHandler = () => {

    async function handleSubmit(data: ReqImagesFormValues) {
        reqImages(data)
    }
    
    return (
        <ScrollView>
            <View className="w-full my-10 flex flex-col gap-3">
                <Text className="text-neutral-100 text-mheading2 font-bold leading-10">
                    Busca por imagens de
                    <Text className="text-primary-500"> satélite.</Text>
                </Text>
                <Text className="text-base text-neutral-300 leading-6">
                    Selecione um intervalo de datas e uma área de interesse para visualizar imagens de satélite e identificar a cobertura de nuvens.
                </Text>
            </View>

            <View className="flex flex-col gap-20 mb-10">
                <ReqImagesForm onSubmit={handleSubmit} />
            </View>
        </ScrollView>
    )
}

export { ReqImageHandler }
