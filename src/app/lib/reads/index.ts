import axios from "axios";

export const createRead = async (readCreate: { user: string; book: string; status: string }) => {
    const response = await axios.post(`/api/reads`, readCreate);
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }
    throw new Error(response.data);
}

export const getBookReadByIsbn = async (isbn: string, ssr: boolean = false) => {
    const endpoint = ssr ? `${process.env.BACKEND_BASE_URL}/api/reads/${isbn}` : `/api/reads/${isbn}`;
    const response = await axios.get(endpoint);
    if (response.status >= 200 && response.status < 300) {
        return response.data.book[0];
    }
    throw new Error(response.data.message);
}