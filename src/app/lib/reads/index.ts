import axios from "axios";

export const createRead = async (readCreate: { user: string; book: string; status: string }) => {
    console.log(JSON.stringify(readCreate))
    const response = await axios.post(`https://books-back-alpha.vercel.app/api/reads`, readCreate);
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }
    throw new Error(response.data);
}

export const getBookReadByIsbn = async (isbn: string) => {
    const response = await axios.get(`https://books-back-alpha.vercel.app/api/reads/${isbn}`);
    return response.data;
}