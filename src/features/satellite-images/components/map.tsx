import React, { useState, useEffect, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { View, Text, Platform, PermissionsAndroid, TouchableOpacity } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { ReqImagesFormValues } from './req-images-form';
import { Button } from '@/src/components/ui/button';

interface MapProps {
    bounds?: { north: number, south: number, east: number, west: number }
    setValue: UseFormSetValue<ReqImagesFormValues>
}

interface MapRegion {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface Coordinate {
    latitude: number,
    longitude: number
}

export function Map({ bounds, setValue }: MapProps) {

    const initialRegion: MapRegion = { latitude: -14.2350, longitude: -53.9253, latitudeDelta: 40, longitudeDelta: 40 };

    const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
    const canAddMarker = !bounds
    const canReset = coordinates.length > 0;

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Permissão de Localização",
                            message: "Este aplicativo precisa acessar sua localização.",
                            buttonNeutral: "Pergunte-me depois",
                            buttonNegative: "Cancelar",
                            buttonPositive: "OK"
                        }
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Permissão de localização negada");
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };

        requestLocationPermission();
    }, []);


    const addMarker = useCallback((event: any) => {
        const { coordinate } = event.nativeEvent;

        if (coordinates.length < 4) {
            setCoordinates((prevCoords) => [...prevCoords, coordinate]);
        }
    }, [coordinates]);

    const onMarkerDragEnd = useCallback((event: any, index: number) => {
        const newCoordinate = event.nativeEvent.coordinate;
        const updatedCoords = [...coordinates];
        updatedCoords[index] = newCoordinate;
        setCoordinates(updatedCoords);

    }, [coordinates]);

    const convertBoundsToCoordinates = (bounds: { north: number; south: number; east: number; west: number }) => {
        return [
            { latitude: bounds.north, longitude: bounds.west },
            { latitude: bounds.north, longitude: bounds.east },
            { latitude: bounds.south, longitude: bounds.east },
            { latitude: bounds.south, longitude: bounds.west },
        ];
    };

    const getBboxFromCoords = (coords: Coordinate[]) => {
        if (coords.length < 4) return '';

        const lats = coords.map(coord => coord.latitude);
        const lngs = coords.map(coord => coord.longitude);

        const north = Math.max(...lats);
        const south = Math.min(...lats);
        const east = Math.max(...lngs);
        const west = Math.min(...lngs);

        const bbox = `${west},${south},${east},${north}`;
        return bbox;
    };

    useEffect(() => {
        if (coordinates.length === 4) {
            const bbox = getBboxFromCoords(coordinates);
            console.log('Bbox:', bbox);
            setValue('bbox', bbox);
        }
    }, [coordinates]);

    return (
        <View className="flex flex-col gap-2">
            {!bounds && (
                <Text className="flex gap-2 items-center">
                    <Text className="text-neutral-300 text-small">Selecione 4 pontos para formar uma área no mapa </Text>
                </Text>
            )}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: '100%', height: 400 }}
                initialRegion={initialRegion}
                zoomControlEnabled
                onPress={canAddMarker ? addMarker : undefined}
            >
                {bounds ? (
                    <Polygon coordinates={convertBoundsToCoordinates(bounds)} strokeColor="#000" strokeWidth={2} fillColor="rgba(0,0,0,0.3)" />
                ) : (
                    coordinates.length > 2 && (
                        <Polygon coordinates={coordinates} strokeColor="#000" strokeWidth={2} fillColor="rgba(0,0,0,0.3)" />
                    )
                )}


                {coordinates.map((coord, index) => (
                    <Marker key={index} coordinate={coord} draggable onDragEnd={(e) => onMarkerDragEnd(e, index)} />
                ))}
            </MapView>
            <Button
                variant='ghost'
                onPress={() => setCoordinates([])}
                disabled={!canReset}
            >
                Resetar Coordenadas
            </Button>
        </View>
    );
}