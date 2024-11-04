import { getCategories } from "@/app/lib/categories";
import Filters from "./Filters";

const FilterWrapper = async () => {
    const categories = await getCategories();
    return (
        <div className="w-full px-2 py-4 flex flex-row justify-end items-center gap-4">
            <Filters categories={categories} />
        </div>
    )
}

export default FilterWrapper;