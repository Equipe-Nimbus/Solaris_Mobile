import type { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'Solaris',
    slug: 'solaris',
    plugins: [
        [
            'expo-font',
            {
                fonts: ['./assets/fonts/Inter.ttf']
            }
        ]
    ],
    android: {
        package: 'com.api.solaris'
    }
})