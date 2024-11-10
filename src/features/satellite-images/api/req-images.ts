import { AxiosResponse } from "axios";
import { ReqImagesFormValues } from "../components/req-images-form";
import { SatelliteImage } from "@/src/types/types";
import { api, endpoints } from "@/src/lib/api-client";
import { fDateToServer } from "@/src/utils/fDate";

export async function reqImages(formValues: ReqImagesFormValues): Promise<AxiosResponse<{ imagens: SatelliteImage[] }>> {
    try {
        const { startDate, endDate, bbox } = formValues;
        const fStartDate = fDateToServer(startDate);
        const fEndDate = fDateToServer(endDate);
        // const { id } = auth.getUser();

        const response = await api.get<{ imagens: SatelliteImage[] }>(endpoints.images.req, {
            params: {
                datetime: `${fStartDate}/${fEndDate}`,
                bbox: bbox,
                // id: id
            }
        })

        return response;
    } catch (error) {
        throw error;
    }
}