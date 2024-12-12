import axios from "axios";

export const getCategories = async () => {
    try {
        const response = await axios.get("/api/categories");
        const categories = response.data;
        return categories.categories.map((category: any) => ({
            _id: category._id,
            name: category.name
        }))
    } catch (error) {
        console.log(error);
        throw error;
    }
}