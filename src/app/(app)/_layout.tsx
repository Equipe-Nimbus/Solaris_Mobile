import { useAuth } from "@/src/lib/auth";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import { useCallback, useEffect } from "react";

import PlusIcon from "@/assets/icons/plus.svg";
import ListIcon from "@/assets/icons/list.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { useIsFirstTime } from "@/src/hooks/use-is-first-time";

export default function TabLayout() {

    const status = useAuth.use.status();
    const [isFirstTime] = useIsFirstTime();

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

    if (isFirstTime) {
        return <Redirect href="/onboarding" />
    }

    if (status === "signOut") {
        return <Redirect href="/login" />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#08090A",
                    paddingVertical: 6
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "semibold"
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
                    headerShown: false,
                    tabBarIcon: ({ color }) => <PlusIcon fill={color} width={18} height={18}/>,
                }}
            />
            <Tabs.Screen
                name="req-list"
                options={{
                    title: "Consultas",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <ListIcon fill={color} width={18} height={18}/>,

                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <SettingsIcon fill={color} width={18} height={18}/>,

                }}
            />
        </Tabs>
    )
}