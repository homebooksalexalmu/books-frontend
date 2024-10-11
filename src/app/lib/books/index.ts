import axios from "axios"

export const getBookByIsbn = async (isbn: string) => {
    try {
        const response = await axios.get(`https://books-back-alpha.vercel.app/api/reads/${isbn}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hola")
    }
}