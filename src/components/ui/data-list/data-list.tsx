import React from 'react';
import { View, Text } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';

interface DataListProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    hasSearched: boolean;
}

function DataList<T>({ data, renderItem, hasSearched }: DataListProps<T>): JSX.Element {
    if (!data?.length) {
        if (!hasSearched) return <></>;

        return (
            <View className="flex h-96 items-center justify-center">
                <Text className="text-neutral-500">Nenhum resultado encontrado</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 w-full">
            <FlashList
                data={data}
                estimatedItemSize={50}
                renderItem={({ item, index }) => <>{renderItem(item, index)}</>}
                ItemSeparatorComponent={() => <View className="h-4" />}
            />
        </View>
    );
}

export { DataList };
