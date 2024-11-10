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