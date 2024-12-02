import { Alert, Linking } from 'react-native';
import { MMKV } from 'react-native-mmkv';

import { showNotification } from '../components/ui/utils';

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export async function downloadFile(url: string) {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Alert.alert(
        'Confirmação de Download',
        'Você será redirecionado para o navegador para baixar o arquivo. Deseja continuar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await Linking.openURL(url);
              showNotification({
                description: 'O download foi iniciado no navegador.',
                type: 'info',
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      console.log(`Não foi possível abrir a URL: ${url}`);
      showNotification({
        description: 'Não foi possível abrir a URL no navegador.',
        type: 'danger',
      });
    }
  } catch (error) {
    console.log(`Erro ao tentar abrir a URL: ${error}`);
    showNotification({
      description: `Erro ao tentar abrir a URL: ${error}`,
      type: 'danger',
    });
  }
}