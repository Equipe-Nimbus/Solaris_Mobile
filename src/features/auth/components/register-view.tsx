import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { RegisterForm } from './register-form';
import { Button } from '@/src/components/ui/button';

import Logo from '@/assets/images/logo.svg';

export default function RegisterView() {
    const router = useRouter();

    return (
        <View className='bg-neutral-800 h-full flex flex-col gap-10 items-center justify-center px-4'>
            <Logo width={150} height={100} />
            <RegisterForm />
            <Text className='text-small text-neutral-400'>Já possui uma conta?</Text>
            <Button variant='ghost' onPress={() => router.push('/login')}>Login</Button>
        </View>
    );
}
