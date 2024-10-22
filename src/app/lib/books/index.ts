import axios from "axios"

export const getBookByIsbn = async (isbn: string) => {
    const response = await axios.get(`https://books-back-alpha.vercel.app/api/books/${isbn}`);
    return response.data;
}

export const updateBookCategories = async (isbn: string, categories: Array<string>) => {
    const response = await axios.patch(`/api/books/${isbn}`, {
        categories
    });
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }

    throw new Error(response.data);
}