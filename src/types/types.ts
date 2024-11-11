export type BaseEntity = {
    id?: number | string;
    id_requisicao?: string;
}

export type SatelliteImage = {
    thumbnail: string;
    tiff: string;
    bbox: number[];
    mascara: string;
    download_links: string;
}

export type AuthResponse = {
    id: number;
    nome_user: string;
    token: string;
}

export type ImagesRequestList = {
    id_requisicao: string;
    data_requisicao: string;
    status_requisicao: boolean;
}

export type ImagesRequest = {
    id_requisicao: string;
    data_requisicao: string;
    bbox_requisicao: number[];
    status_requisicao: boolean;
    tempo_inicio_requisicao: string;
    tempo_final_requisicao: string;
    imagens: SatelliteImage[];
}