import React from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Checkbox } from "@/src/components/ui/checkbox";

import { SatelliteImage } from "@/src/types/types";

import DownloadIcon from "@/assets/icons/download.svg";
import { downloadFile } from "@/src/lib/storage";

type ImageModalProps = {
    cardOpen: boolean;
    setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
    imagem: SatelliteImage;
    isImageVisible: boolean;
    setImageVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isMaskVisible: boolean;
    setMaskVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageModal = ({
    cardOpen,
    setCardOpen,
    imagem,
    isImageVisible,
    setImageVisible,
    isMaskVisible,
    setMaskVisible,
}: ImageModalProps) => {
    const getOpacityClass = () => {
        if (isMaskVisible && isImageVisible) {
            return "opacity-70";
        } else if (isImageVisible) {
            return "opacity-100";
        } else {
            return "opacity-0";
        }
    };

    return (
        <Modal
            visible={cardOpen}
            animationType="fade"
            transparent
            onRequestClose={() => setCardOpen(false)}
        >
            <View className="flex-1 justify-center items-center bg-neutral-600/60">
                <View className="w-11/12 bg-neutral-800 rounded-lg p-6">
                    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                        <View className="relative w-full h-96">
                            <Image
                                source={{ uri: imagem.thumbnail }}
                                className={`w-full h-full object-contain ${getOpacityClass()}`}
                                style={{ width: "100%", height: "100%" }}
                                alt="Imagem de satélite"
                            />
                            <Image
                                source={{ uri: imagem.mascara }}
                                className={`absolute top-0 left-0 w-full h-full object-contain ${isMaskVisible ? "opacity-100" : "opacity-0"}`}
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                alt="Máscara"
                            />
                        </View>
                        <View className="border-t border-neutral-600 my-4 w-full" />
                        <View className="w-full">
                            <View className="flex flex-col gap-8">
                                <View className="flex flex-col gap-2">
                                    <Text className="text-base text-neutral-300 font-medium">Camadas</Text>
                                    <View className="flex flex-row gap-6">
                                        <Checkbox
                                            checked={isImageVisible}
                                            onChange={() => setImageVisible((prev) => !prev)}
                                            label="Original"
                                        />
                                        <Checkbox
                                            checked={isMaskVisible}
                                            onChange={() => setMaskVisible((prev) => !prev)}
                                            label="Nuvem"
                                        />
                                    </View>
                                </View>
                                <View className="flex flex-col gap-2">
                                    <Text className="text-base text-neutral-300 font-medium">Informações</Text>
                                    <View className="flex flex-col gap-1">
                                        <Text className="flex gap-1 text-small text-neutral-400">
                                            <Text className="text-neutral-300">Data da captura:</Text> {imagem.data_imagem_criacao || 'N/A'}
                                        </Text>
                                        <Text className="flex gap-1 text-small text-neutral-400">
                                            <Text className="text-neutral-300">Área (bbox):</Text> {imagem.bbox.toString() || 'N/A'}
                                        </Text>
                                        <Text className="flex gap-1 text-small text-neutral-400">
                                            <Text className="text-neutral-300">Cobertura de nuvens:</Text> {imagem.estatistica_nuvem || 'N/A'}
                                        </Text>
                                        <Text className="flex gap-1 text-small text-neutral-400">
                                            <Text className="text-neutral-300">Cobertura de sombras de nuvem:</Text> {imagem.estatistica_sombra || 'N/A'}
                                        </Text>
                                        <Text className="flex gap-1 text-small text-neutral-400">
                                            <Text className="text-neutral-300">Fundo:</Text> {imagem.estatistica_fundo || 'N/A'}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex flex-col gap-2">
                                    <Text className="text-base text-neutral-300 font-medium">Downloads</Text>
                                    <View className="flex flex-row gap-6">
                                        <TouchableOpacity
                                            className="flex flex-row items-center gap-2"
                                            onPress={() => { downloadFile(imagem.tiff) }}
                                        >
                                            <DownloadIcon width={24} height={24} fill="#A3A3A3" />
                                            <Text className="text-small font-semibold text-neutral-400">tiff</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="flex flex-row items-center gap-2"
                                            onPress={() => { downloadFile(imagem.download_links) }}
                                        >
                                            <DownloadIcon width={24} height={24} fill="#A3A3A3" />
                                            <Text className="text-small font-semibold text-neutral-400">máscara</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={() => setCardOpen(false)} className="mt-4">
                        <Text className="text-center text-neutral-400">Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export { ImageModal };
