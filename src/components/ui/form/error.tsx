import { Text, View } from "react-native";

type ErrorProps = {
    errorMessage?: string | null;
}

const Error = ({ errorMessage }: ErrorProps) => {
    if (!errorMessage) return null;

    return (
        <View>
            <Text className="text-small text-error">{errorMessage}</Text>
        </View>
    )       
}

export { Error };