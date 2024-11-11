import { cnMerge } from "@/src/utils/cnMerge";
// import { Spinner } from "./spinner";
import { Text, View } from "react-native";
import { Spinner } from "./spinner";


type LoadingCardProps = {
    title: string;
    children?: React.ReactNode;
    className?: string;
}

function LoadingCard({ title, className, children }: LoadingCardProps) {
    return (
        <View className={cnMerge("flex flex-col gap-10", className)}>
            <View className="flex flex-col justify-center items-center gap-5">
                <Spinner />
                <Text className="text-mheading4 text-center font-bold text-neutral-200">{title}</Text>
                {children}
            </View>
        </View>
    )
}

export { LoadingCard };