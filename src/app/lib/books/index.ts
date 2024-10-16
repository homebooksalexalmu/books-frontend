import axios from "axios"

export const getBookByIsbn = async (isbn: string) => {
    try {
        const response = await axios.get(`https://books-back-alpha.vercel.app/api/books/${isbn}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting book with ISBN <${isbn}>`);
    }
}

export const updateBookCategories = async (isbn: string, categories: Array<string>) => {
    try {
        const response = await axios.patch(`https://books-back-alpha.vercel.app/api/books/${isbn}`, {
            categories
        });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }

        throw new Error(response.data);

    } catch (error) {
        console.log(error);
        throw new Error(`Error updating book with ISBN <${isbn}>`);
    }
}