import { RequestView } from "@/src/features/satellite-images/components/req-view";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <RequestView requestId={id} />
    )
}