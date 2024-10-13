import axios from "axios";

export const createRead = async (readCreate: { user: string; book: string; status: string }) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/reads`, readCreate);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error creating user read with ISBN <${readCreate.book}>`);
    }
}

export const getBookReadByIsbn = async (isbn: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/reads/${isbn}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting user read with ISBN <${isbn}>`);
    }
}