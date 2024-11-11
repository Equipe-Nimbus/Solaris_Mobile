import { useState } from "react"
import { Button, ScrollView, Text, View } from "react-native"
import { Link, useRouter } from "expo-router"

import { ReqImagesForm, ReqImagesFormValues } from "./req-images-form"
import { ImagesList } from "./images-list"
import { reqImages } from "../api/req-images"

import { showNotification } from "@/src/components/ui/utils"
import { LoadingCard } from "@/src/components/ui/loading"

import { useAuth } from "@/src/lib/auth"

import { SatelliteImage } from "@/src/types/types"

const ReqImageHandler = () => {

    const [images, setImages] = useState<SatelliteImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const logout = useAuth.use.signOut()
    const router = useRouter()

    async function handleSubmit(data: ReqImagesFormValues) {
        setIsLoading(true);

        await reqImages(data)
            .then((response) => {
                setImages(response.data.imagens);
            })
            .catch((e) => {
                showNotification({
                    description: 'Erro ao buscar imagens',
                    type: 'danger'
                })
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
                setHasSearched(true);
            });
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
                {isLoading ? (
                    <LoadingCard
                        title="Processando suas imagens..."
                    >
                        <Text className="max-w-[400px] text-center text-neutral-400">
                            Isso pode levar algum tempo. Você pode retornar a qualquer momento e verificar o status da sua requisição nas suas
                        </Text>
                        <Link href="/(app)/req-list" >
                            <Text className="text-primary-500">requisições anteriores</Text>
                        </Link>
                    </LoadingCard>
                ) : (
                    <ImagesList images={images} hasSearched={hasSearched} />
                )}
            </View>

        </ScrollView>
    )
}

export { ReqImageHandler }
