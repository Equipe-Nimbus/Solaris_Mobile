import { Text, View } from 'react-native';

import { useAuth, RegisterFormValues, registerSchema } from '@/src/lib/auth';
import { Form, Input } from '@/src/components/ui/form';
import { showNotification } from '@/src/components/ui/utils';

export function RegisterForm() {
    const register = useAuth.use.register();

    async function handleRegister(data: RegisterFormValues) {
        await register(data)
            .then(() => {
                console.log('Usuário cadastrado com sucesso');
                showNotification({
                    description: 'Usuário cadastrado com sucesso. Você já pode fazer login.',
                    type: 'success',
                });
            })
            .catch((error) => {
                console.log(error);
                showNotification({
                    description: `Erro ao cadastrar usuário: ${error?.response?.data?.erro}`,
                    type: 'danger',
                });
            });
    }

    return (
        <View className='bg-neutral-700/70 w-full flex flex-col px-10 py-10 rounded-lg gap-5 border border-neutral-600'>
            <Text className='text-large text-neutral-100 font-semibold'>Cadastro</Text>
            <Form
                onSubmit={handleRegister}
                schema={registerSchema}
                className="flex flex-col gap-6 justify-center"
                submitText='Cadastrar'
            >
                {({ control }) => (
                    <>
                        <Input
                            control={control}
                            name="nome_user"
                            label="Nome"
                        />
                        <Input
                            control={control}
                            name="cpf_user"
                            label="CPF"
                        />
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
