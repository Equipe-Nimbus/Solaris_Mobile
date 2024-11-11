import { Button } from "@/src/components/ui/button"
import { showNotification } from "@/src/components/ui/utils";
import { useAuth } from "@/src/lib/auth"
import { View } from "react-native"

const SettingsView = () => {

    const signOut = useAuth.use.signOut();

    return (
        <View className="flex-1 flex flex-col mb-10">
            <View className="mt-auto">
                <Button
                    variant="outline"
                    onPress={() => {
                        signOut();
                        showNotification({
                            description: 'Sessão encerrada',
                            type: 'success'
                        })
                    }}
                >
                    Sair
                </Button>
            </View>
        </View>
    )
}

export { SettingsView };