import { Tabs } from "expo-router";

export default function TabLayout() {
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
        </Tabs>
    )
}