import { useAuth } from "@/src/lib/auth";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import { useCallback, useEffect } from "react";

export default function TabLayout() {

    const status = useAuth.use.status();

    const hideSplash = useCallback(async () => {
        await SplashScreen.hideAsync();
    }, []);
    useEffect(() => {
        if (status !== 'idle') {
            setTimeout(() => {
                hideSplash();
            }, 1000);
        }
    }, [hideSplash, status]);

    if (status === "signOut") {
        return <Redirect href="/login" />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#08090A",
                    paddingBottom: 6
                },
                tabBarActiveTintColor: "#FF8A05",
                tabBarInactiveTintColor: "#A3A3A3"
            }}
            sceneContainerStyle={{
                backgroundColor: "#08090A",
                paddingHorizontal: 16,
                display: "flex",
                flexDirection: "column",
                gap: 24
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Nova consulta",
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="req-list"
                options={{
                    title: "Consultas",
                    headerShown: false
                }}
            />
        </Tabs>
    )
}