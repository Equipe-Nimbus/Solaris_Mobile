import { AxiosResponse } from "axios";
import { ReqImagesFormValues } from "../components/req-images-form";
import { ImagesRequest, ImagesRequestList, SatelliteImage } from "@/src/types/types";
import { api, endpoints } from "@/src/lib/api-client";
import { fDateToServer } from "@/src/utils/fDate";
import { useAuth } from "@/src/lib/auth";
import { replaceLocalhost } from "@/src/utils/replaceImageLinks";

export async function reqImages(formValues: ReqImagesFormValues): Promise<SatelliteImage[]> {
    try {
        const { startDate, endDate, bbox } = formValues;
        const fStartDate = fDateToServer(startDate);
        const fEndDate = fDateToServer(endDate);

        const id = useAuth.getState().user?.id;

        const response = await api.get<{ imagens: SatelliteImage[] }>(endpoints.images.req, {
            params: {
                datetime: `${fStartDate}/${fEndDate}`,
                bbox: bbox,
                id: id
            }
        })

        // gambiarra para rodar localmente no emulador
        const updatedImages = response.data.imagens.map(image => {
            image.mascara = replaceLocalhost(image.mascara);
            image.download_links = replaceLocalhost(image.download_links);
            return image;
        });


        return updatedImages;
    } catch (error) {
        throw error;
    }
}

export async function getRequests(): Promise<ImagesRequestList[]> {
    try {
        const userId = useAuth.getState().user?.id || 0;
        const res = await api.get<{ listaRequisicao: ImagesRequestList[]}>(endpoints.requests.list(userId));

        const { listaRequisicao } = res.data;
        return listaRequisicao || [];
    } catch (error) {
        throw error;
    }
}

export async function getRequestById(id: string ): Promise<ImagesRequest> {
    try {
        const res = await api.get<ImagesRequest>(endpoints.requests.listOne(id));

        // gambiarra para rodar localmente no emulador
        res.data.imagens = res.data.imagens.map(image => {
            image.mascara = replaceLocalhost(image.mascara);
            image.download_links = replaceLocalhost(image.download_links);
            return image;
        });

        return res.data;
    } catch (error) {
        throw error;
    }
}
