import React from 'react';
import { Text, View } from 'react-native';

import { ImageCard } from './image-card';
import { DataList } from '@/src/components/ui/data-list';

import { SatelliteImage } from '@/src/types/types';

type ImagesListProps = {
    images: SatelliteImage[];
    hasSearched: boolean;
};

const ImagesList = ({ images, hasSearched }: ImagesListProps) => {

    if (hasSearched && images.length === 0) return (
        <View className="flex justify-center items-center h-64">
            <Text className="text-lg text-neutral-100">Nenhuma imagem encontrada.</Text>
        </View>
    )

    return (
        <DataList
            data={images}
            renderItem={(item, index) => <ImageCard item={item} index={index} />}
            hasSearched={hasSearched}
        />
    );
};

export { ImagesList };