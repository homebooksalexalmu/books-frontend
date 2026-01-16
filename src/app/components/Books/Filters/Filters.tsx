"use client";
import { BookReadsStatus, getStatusName } from "@/app/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, ChangeEvent, FC } from "react";

interface FiltersProps {
    categories: Array<{ _id: string; name: string }>;
    authors: Array<string>;
    setFilters: Dispatch<SetStateAction<Record<string, any>>>;
}

const Filters: FC<FiltersProps> = ({ categories, authors, setFilters }) => {
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

    const handleAuthorsChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        updateFilter("author", evt.target.value);
    };

    return (
        <div className="w-full flex flex-col gap-3 md:flex-row md:gap-4 md:justify-between md:items-end">
            {/* Checkbox - My Books */}
            <div className="flex items-center">
                <Checkbox
                    onChange={e => handleUserFilterChange(e.target.checked)}
                    size="md"
                    classNames={{
                        wrapper: "group-data-[selected=true]:bg-primary-600",
                    }}
                    isDisabled={isLoading}
                >
                    <span className="text-neutral-700 font-medium">Mis libros</span>
                </Checkbox>
            </div>

            {/* Status Select */}
            <Select
                label="Estado"
                className="w-full md:max-w-xs text-neutral-700"
                onChange={handleStatusChange}
                size="sm"
                classNames={{
                    label: "text-neutral-600 font-medium",
                }}
            >
                {Object.values(BookReadsStatus).map((status: string) => (
                    <SelectItem key={status} value={status}>
                        {getStatusName(status)}
                    </SelectItem>
                ))}
            </Select>

            {/* Category Select */}
            <Select
                label="Categoría"
                className="w-full md:max-w-xs text-neutral-700"
                onChange={handleCategoryChange}
                size="sm"
                classNames={{
                    label: "text-neutral-600 font-medium",
                }}
            >
                {categories.map(category => (
                    <SelectItem key={category._id} value={category._id}>
                        {category.name}
                    </SelectItem>
                ))}
            </Select>

            {/* Author Select */}
            {authors && authors.length > 0 ? (
                <Select
                    label="Autor"
                    className="w-full md:max-w-xs text-neutral-700"
                    onChange={handleAuthorsChange}
                    size="sm"
                    classNames={{
                        label: "text-neutral-600 font-medium",
                    }}
                >
                    {authors.map((author: string) => (
                        <SelectItem key={author} value={author}>
                            {author}
                        </SelectItem>
                    ))}
                </Select>
            ) : null}
        </div>
    );
};

export default Filters;
