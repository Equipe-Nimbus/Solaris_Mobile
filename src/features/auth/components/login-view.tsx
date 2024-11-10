import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { LoginForm } from './login-form';
import { Button } from '@/src/components/ui/button';

import Logo from '@/assets/images/logo.svg';

export default function LoginView() {
    const router = useRouter();

    return (
        <View className='bg-neutral-800 h-full flex flex-col gap-10 items-center justify-center px-4'>
            <Logo width={150} height={100} />
            <LoginForm />
            <Text className='text-small text-neutral-400'>Não possui uma conta?</Text>
            <Button variant='ghost' onPress={() => router.push('/register')}>Cadastrar</Button>
        </View>
    );
}
