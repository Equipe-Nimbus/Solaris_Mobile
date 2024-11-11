import { useEffect, useState } from "react";

import { Text, View } from "react-native";

import { Map } from "./map";
import { getRequestById } from "../api/req-images";
// import { ImageGrid } from "./image-grid";

import { showNotification } from "@/src/components/ui/utils";

import { ImagesRequest } from "@/src/types/types";

import { fDate } from "@/src/utils/fDate";

import GreenCircle from "@/assets/icons/green-circle.svg";  
import OrangeCircle from "@/assets/icons/orange-circle.svg";
import { REQUEST_MOCK } from "@/src/utils/mocks";

type RequestViewProps = {
    requestId: string;
}

const RequestView = ({ requestId }: RequestViewProps) => {
    const [request, setRequest] = useState<ImagesRequest>(REQUEST_MOCK);

    const bounds = {
        west: request.bbox_requisicao[0],
        south: request.bbox_requisicao[1],
        east: request.bbox_requisicao[2],
        north: request.bbox_requisicao[3]
    };


    useEffect(() => {
        getRequestById(requestId)
            .then((response) => {
                setRequest(response)
            })
            .catch((error) => {
                showNotification({
                    description: 'Erro ao buscar requisição',
                    type: 'danger'
                })
                console.log(error);
            });
    }, [requestId])

    return (
        <View className="h-full bg-neutral-800 px-4">
            <View className="flex flex-col py-8">
                <View className="flex flex-col gap-2 py-6">
                    <Text className="text-neutral-400 font-medium">Id da consulta</Text>
                    <Text className="text-neutral-300 text-xl font-semibold">{request.id_requisicao}</Text>
                </View>
                <View className="border-t border-t-neutral-600/50" />
                <View className="py-12">
                    <Text className="text-neutral-400 font-medium">sua requisição está</Text>
                    <View className="flex flex-row items-center gap-2 mt-3">
                        {request.status_requisicao ? (
                            <>
                                <GreenCircle width={20} height={20}/>
                                <Text className="font-semibold text-mheading3 text-success">CONCLUÍDA</Text>
                            </>
                        ) : (
                            <>
                                <OrangeCircle width={20} height={20}/>
                                <Text className="font-semibold text-mheading3 text-primary-500">EM PROCESSAMENTO</Text>
                            </>
                        )}
                    </View>
                    <Text className="text-neutral-400 font-medium block mt-6">Data da realização: {fDate(request.data_requisicao)}</Text>
                </View>
                <View className="border-t border-t-neutral-600/50" />
                <View className="flex flex-col py-6">
                    <Text className="text-neutral-300 font-semibold">Parâmetros</Text>
                    <View className="flex flex-col gap-4 mt-5">
                        <View className="flex flex-col gap-2">
                            <Text className="text-neutral-400 font-medium">Data inicial: <Text className="text-neutral-300 font-medium">{fDate(request.tempo_inicio_requisicao)}</Text></Text>
                            <Text className="text-neutral-400 font-medium">Data final: <Text className="text-neutral-300 font-medium">{fDate(request.tempo_final_requisicao)}</Text></Text>
                        </View>
                        <View className="w-full xl:w-1/2">
                            <Map bounds={bounds} />
                        </View>
                    </View>
                </View>
            </View>
            {/* {request.status_requisicao ? (
                <ImageGrid imagens={request.imagens} hasSearched={true} />
            ) : (
                <LoadingCard
                    title="Processando suas imagens..."
                >
                    <Text className="max-w-[400px] text-center text-neutral-400">
                        Isso pode levar algum tempo. Você pode retornar a qualquer momento e verificar o status da sua requisição nas suas{' '}
                        <Link href={paths.requests.list} className="text-primary-500">
                            requisições anteriores.
                        </Link>
                    </Text>
                </LoadingCard>
            )} */}
        </View>
    )
}

export { RequestView }