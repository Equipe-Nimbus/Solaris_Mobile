import { ImagesRequestList } from "@/src/types/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getRequests } from "../api/req-images";
import { showNotification } from "@/src/components/ui/utils";
import { RequestsList } from "./req-list";
import { ScrollView } from "react-native";

const ReqListView = () => {
    const [requests, setRequests] = useState<ImagesRequestList[]>([]);

    useEffect(() => {
        getRequests()
            .then((response) => {
                setRequests(response);
            })
            .catch((error) => {
                showNotification({
                    description: 'Erro ao buscar requisições',
                    type: 'danger'
                })
                console.log(error);
            });
    }, [])

    return (
        <ScrollView>
            <View className="flex flex-1 flex-col gap-10 justify-center my-10">
                <Text className="text-neutral-300 text-mheadging4 font-semibold">Consultas anteriores</Text>

                <RequestsList requests={requests} />
            </View>
        </ScrollView>
    )
}

export { ReqListView };