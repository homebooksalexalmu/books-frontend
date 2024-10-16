import axios from "axios";

export const createRead = async (readCreate: { user: string; book: string; status: string }) => {
    try {
        const response = await axios.post(`https://books-back-alpha.vercel.app/api/reads`, readCreate);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(response.data);
    } catch (error) {
        console.log(error);
        throw new Error(`Error creating user read with ISBN <${readCreate.book}>`);
    }
}

export const getBookReadByIsbn = async (isbn: string) => {
    try {
        const response = await axios.get(`https://books-back-alpha.vercel.app/api/reads/${isbn}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting user read with ISBN <${isbn}>`);
    }
}