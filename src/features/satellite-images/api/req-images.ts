import { AxiosResponse } from "axios";
import { ReqImagesFormValues } from "../components/req-images-form";
import { ImagesRequest, ImagesRequestList, SatelliteImage } from "@/src/types/types";
import { api, endpoints } from "@/src/lib/api-client";
import { fDateToServer } from "@/src/utils/fDate";
import { useAuth } from "@/src/lib/auth";

export async function reqImages(formValues: ReqImagesFormValues): Promise<AxiosResponse<{ imagens: SatelliteImage[] }>> {
    try {
        const { startDate, endDate, bbox } = formValues;
        const fStartDate = fDateToServer(startDate);
        const fEndDate = fDateToServer(endDate);

        const id = useAuth.use.user()?.id;

        const response = await api.get<{ imagens: SatelliteImage[] }>(endpoints.images.req, {
            params: {
                datetime: `${fStartDate}/${fEndDate}`,
                bbox: bbox,
                id: id
            }
        })

        return response;
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

        return res.data;
    } catch (error) {
        throw error;
    }
}
