import axios from "axios"

export const getBookByIsbn = async (isbn: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/books/${isbn}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting book with ISBN <${isbn}>`);
    }
}

export const updateBookCategories = async (isbn: string, categories: Array<string>) => {
    try {
        const response = await axios.patch(`http://localhost:3000/api/books/${isbn}`, {
            categories
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error updating book with ISBN <${isbn}>`);
    }
}