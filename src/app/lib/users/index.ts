import axios from "axios";

export const getVerifiedUsers = async () => {
    try {
        const { data: token } = await axios.get("http://localhost:3001/api/token");
        const response = await axios.get("https://books-back-alpha.vercel.app/api/users", {
            headers: {
                Authorization: `Bearer ${token.idToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}