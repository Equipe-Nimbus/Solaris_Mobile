import type { ConfigContext, ExpoConfig } from '@expo/config';
import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: Env.NAME,
    description: `${Env.NAME} Mobile App`,
    slug: 'solaris',
    version: Env.VERSION.toString(),
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true
    },
    android: {
        package: Env.PACKAGE,
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        config: {
            googleMaps: {
                apiKey: Env.GOOGLE_MAPS_API_KEY
            },
        }
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
    },
    plugins: [
        "expo-router",
        [
            'expo-font',
            {
                fonts: ['./assets/fonts/Inter.ttf']
            }
        ]
    ],
    experiments: {
        "typedRoutes": true
    },
    extra: {
        ...ClientEnv,
        eas: {
            projectId: Env.EAS_PROJECT_ID
        }
    }
})