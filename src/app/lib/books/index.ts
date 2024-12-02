import axios from "axios"

export const getBookByIsbn = async (isbn: string) => {
    const response = await axios.get(`https://books-back-alpha.vercel.app/api/books/${isbn}`);

    if (response.status === 504) {
        throw new Error("Se agotó el tiempo. Vuelva a intentarlo más tarde.")
    }

    return response.data;
}

export const updateBookCategories = async (isbn: string, categories: Array<string>) => {
    const response = await axios.put(`/api/books/${isbn}/categories`, {
        categories
    });
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }

    throw new Error(response.data);
}

export const updateBook = async (isbn: string, newBook: any) => {
    const response = await axios.put(`/api/books/${isbn}`, {
        newBook
    });

    if (response.status === 504) {
        throw new Error("Se agotó el tiempo. Vuelva a intentarlo más tarde.")
    }

    return response.data;
}