import { useRouter } from "expo-router";

import { DataList } from "@/src/components/ui/data-list";

import { ImagesRequestList } from "@/src/types/types";
import { Text, View } from "react-native";
import { Button } from "@/src/components/ui/button";
import { fDate } from "@/src/utils/fDate";

import GreenCircle from "@/assets/icons/green-circle.svg";
import OrangeCircle from "@/assets/icons/orange-circle.svg";

type RequestsListProps = {
    requests: ImagesRequestList[];
}

const RequestsList = ({ requests }: RequestsListProps) => {
    const router = useRouter();

    const requestCard = (item: ImagesRequestList, index: number) => (
        <View
            key={index}
            className="bg-neutral-700/70 w-full flex flex-col gap-4 p-4 border border-neutral-600 rounded-lg"
        >
            <Text className="text-small font-medium text-neutral-400">{fDate(item.data_requisicao)}</Text>
            <View className="flex flex-col gap-2">
                <Text className="text-base font-semibold text-neutral-200">{item.id_requisicao}</Text>
                {item.status_requisicao ? (
                    <View className="w-full flex flex-row items-center gap-3">
                        <GreenCircle width={12} height={12} />
                        <Text className="text-base font-semibold text-success">CONCLUÍDA</Text>
                    </View>
                ) : (
                    <View className="w-full flex flex-row items-center gap-3">
                        <OrangeCircle width={12} height={12} />
                        <Text className="text-base font-semibold text-primary-500">EM ANDAMENTO</Text>
                    </View>
                )}

                <Button
                    variant="ghost"
                    className="text-left"
                    onPress={() => { router.push(`/req/${item.id_requisicao}`) }}
                >
                    Ver detalhes
                </Button>
            </View>
        </View>
    );

    return (
        <DataList
            data={requests}
            renderItem={requestCard}
            hasSearched
        />
    )
}

export { RequestsList };