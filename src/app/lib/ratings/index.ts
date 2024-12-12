import { Nullable } from "@/backend/shared/domain/utils";
import axios from "axios";

export const updateBookRating = async (isbn: string, rate: number, userId: Nullable<string>) => {
    if (rate < 1 || rate > 5 || !userId || !userId.trim().length) {
        return;
    }
    await axios.put(`/api/ratings/${isbn}`, {
        rate,
        user: userId
    });
}