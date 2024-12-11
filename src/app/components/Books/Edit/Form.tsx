
import { updateBook } from "@/app/lib/books";
import { getCategories } from "@/app/lib/categories";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

const BookEditForm = ({ book }: { book: any }) => {
    const router = useRouter();
    const [categories, setCategories] = useState<Array<{ _id: string; name: string; }>>([]);
    const { register, handleSubmit, control, formState: { errors } } = useForm<any>(
        {
            defaultValues: {
                authors: book.authors.map((author: string) => ({ value: author })) || [],
                categories: book.categories.map((category: any) => category) || [],
            },
        }
    );

    const { fields, append, remove } = useFieldArray({
        control,
        name: "authors",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, []);

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const pages = parseInt(data.pages, 10);
            data.pages = isNaN(pages) ? 0 : pages;
            await updateBook(data._id, data);
            router.push("/");
        } catch (err: any) {
            console.error(err);
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error(err.response.data.message);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
        >
            <input
                type="hidden"
                {...register("_id")}
                defaultValue={book._id}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ISBN */}
                <div>
                    <label
                        htmlFor="_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        ISBN
                    </label>
                    <Input
                        id="_id"
                        isDisabled
                        defaultValue={book._id}
                        className="w-full"
                    />
                </div>

                {/* Título */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Título
                    </label>
                    <Input
                        id="title"
                        {...register("title", { required: "El título es obligatorio" })}
                        defaultValue={book.title}
                        className="w-full"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{(errors as any).title.message}</p>
                    )}
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Descripción
                    </label>
                    <Textarea
                        id="description"
                        {...register("description", {
                            required: "La descripción es obligatoria",
                        })}
                        defaultValue={book.description}
                        className="w-full"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {(errors as any).description.message}
                        </p>
                    )}
                </div>

                {/* Categorías */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="categories"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Categorías
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <label key={category._id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={category._id}
                                    {...register("categories")}
                                    defaultChecked={book.categories.includes(category._id)}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.categories && (
                        <p className="text-red-500 text-sm mt-1">
                            {(errors as any).categories.message}
                        </p>
                    )}
                </div>

                {/* Editorial */}
                <div>
                    <label
                        htmlFor="publisher"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Editorial
                    </label>
                    <Input
                        id="publisher"
                        {...register("publisher", {
                            required: "La editorial es obligatoria",
                        })}
                        defaultValue={book.publisher}
                        className="w-full"
                    />
                    {errors.publisher && (
                        <p className="text-red-500 text-sm mt-1">
                            {(errors as any).publisher.message}
                        </p>
                    )}
                </div>

                {/* Páginas */}
                <div>
                    <label
                        htmlFor="pages"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Páginas
                    </label>
                    <Input
                        id="pages"
                        defaultValue={book.pages}
                        className="w-full"
                        type="number"
                        {...register("pages")}
                    />
                    {errors.pages && (
                        <p className="text-red-500 text-sm mt-1">
                            {(errors as any).pages.message}
                        </p>
                    )}
                </div>

                {/* Autores (Lista dinámica) */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="authors"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Autores
                    </label>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-center">
                                <Input
                                    {...register(`authors.${index}.value`, {
                                        required: "Este campo es obligatorio",
                                    })}
                                    defaultValue={(field as any).value}
                                    className="w-full"
                                />
                                <Button
                                    onClick={() => remove(index)}
                                    className="ml-2"
                                >
                                    Eliminar
                                </Button>
                            </div>
                        ))}
                        <Button
                            onClick={() => append({ value: "" })}
                            className="mt-2"
                        >
                            Agregar Autor
                        </Button>
                    </div>
                    {errors.authors && (
                        <p className="text-red-500 text-sm mt-1">
                            {(errors as any).authors.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Botón de Enviar */}
            <Button
                type="submit"
                color="primary"
                className="w-full mt-6"
            >
                Enviar
            </Button>
        </form >
    );
}

export default BookEditForm;