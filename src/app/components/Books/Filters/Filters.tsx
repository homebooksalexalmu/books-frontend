"use client";
import { BookReadsStatus, getStatusName } from "@/app/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, ChangeEvent, FC } from "react";

interface FiltersProps {
    categories: Array<{ _id: string; name: string }>;
    setFilters: Dispatch<SetStateAction<Record<string, any>>>;
}

const Filters: FC<FiltersProps> = ({ categories, setFilters }) => {
    const { user, isLoading } = useUser();

    const updateFilter = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleCategoryChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        updateFilter("categories", evt.target.value);
    };

    const handleUserFilterChange = (isChecked: boolean) => {
        if (!user || isLoading) return;
        updateFilter("reader", isChecked ? user.sub : undefined);
    };

    const handleStatusChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        updateFilter("status", evt.target.value);
    };

    return (
        <>
            <Checkbox onChange={e => handleUserFilterChange(e.target.checked)} size="md">
                Mis libros
            </Checkbox>
            <Select
                label="Estado"
                className="w-full md:max-w-xs"
                onChange={handleStatusChange}
            >
                {Object.values(BookReadsStatus).map((status: string) => (
                    <SelectItem key={status} value={status}>
                        {getStatusName(status)}
                    </SelectItem>
                ))}
            </Select>
            <Select
                label="Elige tu categoría"
                className="w-full md:max-w-xs"
                onChange={handleCategoryChange}
            >
                {categories.map(category => (
                    <SelectItem key={category._id} value={category._id}>
                        {category.name}
                    </SelectItem>
                ))}
            </Select>
        </>
    );
};

export default Filters;
