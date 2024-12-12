import axios, { AxiosError } from "axios"

export const getBookByIsbn = async (isbn: string) => {
    try {
        const response = await axios.get(`/api/books/${isbn}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.status === 504) {
            throw new Error("Se agotó el tiempo. Vuelva a intentarlo más tarde.");
        }
        throw new Error("Internal server error");
    }
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

export const updateBookPortrait = async (isbn: string, file: File | undefined) => {
    if (!file) return;

    try {
        const data = new FormData();
        data.set("file", file);

        const response = await axios.put(`/api/books/${isbn}/portrait`, data);

        if (response.status === 504) {
            throw new Error("Se agotó el tiempo. Vuelva a intentarlo más tarde.")
        }

        return response.data;
    } catch (error: unknown) {
        console.error(error);
    }
}