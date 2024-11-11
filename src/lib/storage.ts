import { MMKV } from 'react-native-mmkv';
import RNFS from 'react-native-fs';

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

export const downloadFile = async (url: string) => {
  const fileName = url.split('/').pop();
  const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

  try {
    const downloadResult = await RNFS.downloadFile({
      fromUrl: url,
      toFile: destPath,
      
    }).promise;

    if (downloadResult.statusCode === 200) {
      showNotification({
        description: `Download concluído. Arquivo salvo em: ${destPath}`,
        type: 'success',
      })
    } else {
      showNotification({
        description: 'Erro ao baixar arquivo.',
        type: 'danger',
      })
    }
  } catch (error) {
    showNotification({
      description: 'Erro ao baixar arquivo.',
      type: 'danger',
    })
  }
};