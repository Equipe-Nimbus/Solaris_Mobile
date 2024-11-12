import { Text, View } from 'react-native';

import { useAuth, LoginFormValues, loginSchema } from '@/src/lib/auth';
import { Form, Input } from '@/src/components/ui/form';
import { showNotification } from '@/src/components/ui/utils';
import { useRouter } from 'expo-router';

export function LoginForm() {
    const router = useRouter();     
    const signIn = useAuth.use.signIn();

    async function handleLogin(data: LoginFormValues) {
        await signIn(data)
            .then(() => {
                showNotification({
                    description: 'Usuário logado com sucesso.',
                    type: 'success',
                });
                router.push('/(app)/');
            })
            .catch((error) => {
                console.log(error);
                showNotification({
                    description: `Erro ao fazer o login: ${error?.response?.data?.erro}`,
                    type: 'danger',
                });
            });
    }

    return (
        <View className='bg-neutral-700/70 w-full flex flex-col px-10 py-10 rounded-lg gap-5 border border-neutral-600'>
            <Text className='text-large text-neutral-100 font-semibold'>Login</Text>
            <Form
                onSubmit={handleLogin}
                schema={loginSchema}
                className="flex flex-col gap-6 justify-center"
                submitText='Entrar'
            >
                {({ control }) => (
                    <>
                        <Input
                            control={control}
                            name="email_user"
                            label="Email"
                        />
                        <Input
                            control={control}
                            name="senha_user"
                            label="Senha"
                            secureTextEntry
                        />
                    </>
                )}
            </Form>
        </View>
    );
}
