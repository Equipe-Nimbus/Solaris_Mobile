import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/button';

import { useIsFirstTime } from '../hooks/use-is-first-time';

import Logo from '@/assets/images/logo.svg';

export default function LandingPage() {
    const router = useRouter();
    const [_, setIsFirstTime] = useIsFirstTime();

    const steps = [
        {
            title: 'Consulta ao catálogo',
            description: 'Defina sua área de interesse e período.'
        },
        {
            title: 'Processamento',
            description: 'Solaris consulta o catálogo do INPE e processa as imagens.'
        },
        {
            title: 'Resultados',
            description: 'Receba as máscaras de nuvens, sombras de nuvens e outras informações.'
        },
        {
            title: 'Análise',
            description: 'Analise, baixe os arquivos e use os conforme precisar.'
        }
    ]

    return (
        <ScrollView className="bg-neutral-800 flex-1">
            <View className="flex flex-col items-center py-20">
                <View className='flex justify-center items-center'>
                    <Logo width={150} height={100} />
                </View>
                <View className="w-11/12 flex flex-col gap-28 mt-20">
                    <View className="flex flex-col gap-6 min-h-[480px]" id="hero">
                        <Text className="text-neutral-200 text-mheading1 font-semibold leading-tight">Análise e processamento de imagens de satélite.</Text>
                        <Text className="text-neutral-400 text-xl font-medium text-justify">Identificação de nuvens e sombras utilizando inteligência artificial. Simplifica a consulta, geração de máscaras e análise dos dados.</Text>
                        <Button 
                            variant="primary" 
                            className="w-fit flex" 
                            onPress={() => {
                                setIsFirstTime(false);
                                router.replace('/login')
                            }}
                        >
                            Consultar imagens
                        </Button>
                    </View>
                    <View className="flex flex-col gap-6">
                        <Text className="text-neutral-100 text-2xl font-semibold leading-tight text-center">Sobre o projeto</Text>
                        <Text className="text-neutral-400 text-large font-medium text-justify">
                            O Solaris é uma plataforma web e mobile que aplica inteligência artificial para gerar máscaras de nuvens e sombras em imagens capturadas pelo satélite CBERS4A com o sensor WPM, fornecidas pelo INPE.
                        </Text>
                        <View className="flex justify-center mt-10">
                            <View className="relative w-full h-64">
                                <Image
                                    source={require('@/assets/images/results.gif')}
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View className="flex flex-col gap-10">
                        <Text className="text-neutral-100 text-2xl font-semibold leading-tight text-center">Como funciona?</Text>
                        <View className="relative border-s border-primary-500 ml-8">
                            {steps.map((step, index) => (
                                <View key={index} className="mb-10 ms-6">
                                    <Text className="text-large font-medium leading-tight text-neutral-200">{`${index + 1} - ${step.title}`}</Text>
                                    <Text className="text-neutral-400">{step.description}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}