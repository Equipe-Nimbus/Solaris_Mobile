import { useEffect, useState, useCallback } from "react";

import { Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";

import { RequestsList } from "./req-list";
import { getRequests } from "../api/req-images";

import { showNotification } from "@/src/components/ui/utils";

import { ImagesRequestList } from "@/src/types/types";


const ReqListView = () => {
    const [requests, setRequests] = useState<ImagesRequestList[]>([]);

    const fetchRequests = useCallback(() => {
        getRequests()
            .then((response) => {
                setRequests(response);
            })
            .catch((error) => {
                showNotification({
                    description: 'Erro ao buscar requisições',
                    type: 'danger'
                });
                console.log(error);
            });
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchRequests();
        }, [fetchRequests])
    );

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