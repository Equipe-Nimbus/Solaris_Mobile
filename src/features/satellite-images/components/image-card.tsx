import React, { useState } from "react";

import { View, Text, TouchableOpacity, Image } from "react-native";

import { SatelliteImage } from "@/src/types/types";
// import { ImageModal } from "./image-modal"; // A ser discutido posteriormente

import Full from "@/assets/icons/full.svg";
import { ImageModal } from "@/src/components/ui/modal/image-modal";

type ImageCardProps = {
    item: SatelliteImage;
    index: number;
};

const ImageCard = ({ item, index }: ImageCardProps) => {
    const [cardOpen, setCardOpen] = useState<boolean>(false);
    const [isImageVisible, setImageVisible] = useState<boolean>(true);
    const [isMaskVisible, setMaskVisible] = useState<boolean>(false);


    return (
        <>
            <View className="relative w-full min-h-72 h-fit p-4 bg-neutral-700/70 border border-neutral-600 rounded-lg flex flex-col items-center">
                <View className="relative w-full h-72 z-0">
                    <Image
                        source={{ uri: item.thumbnail }}
                        className={`w-full h-full object-contain ${isMaskVisible ? 'opacity-70' : 'opacity-100'}`}
                        alt="Imagem de satélite"
                    />
                    <Image
                        source={{ uri: item.mascara }}
                        className={`absolute top-0 left-0 w-full h-full object-contain ${isMaskVisible ? 'opacity-100' : 'opacity-0'}`}
                        alt="Máscara"
                    />
                </View>
                <View className="flex flex-row justify-between items-center w-full gap-2 mt-4">
                    <TouchableOpacity
                        onPress={() => setMaskVisible((prev) => !prev)}
                        className={`${isMaskVisible ? 'bg-primary-100/15' : ''} p-2 rounded-lg`}
                    >
                        <Text className="text-button text-primary-500 font-medium">Alternar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCardOpen(true)}>
                        <Full width={24} height={24} fill="#A3A3A3" />
                    </TouchableOpacity>
                </View>
            </View>

            <ImageModal
                cardOpen={cardOpen}
                setCardOpen={setCardOpen}
                imagem={item}
                isImageVisible={isImageVisible}
                setImageVisible={setImageVisible}
                isMaskVisible={isMaskVisible}
                setMaskVisible={setMaskVisible}
            />
        </>
    );
};

export { ImageCard };
