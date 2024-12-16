import axios from "axios";
import { EDGE_NODE_API_ENDPOINT } from "@/utils/constants";

export async function getAssetByUal(ual) {
  const endpoint =
    import.meta.env.VITE_EDGE_NODE_API_ENDPOINT ?? EDGE_NODE_API_ENDPOINT;
  try {
    const response = await axios.get(`${endpoint}/graph/get`, {
      params: {
        ual,
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error fetching asset by UAL:", e);
    return null;
  }
}
