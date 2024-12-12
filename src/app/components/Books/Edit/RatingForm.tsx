import { updateBookRating } from '@/app/lib/ratings';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

const RatingForm = ({ isbn, setOpen }: { isbn: string, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const {user, isLoading} = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    if (!user && isLoading) return (<div className="w-full flex flex-row justify-center"><p>Loading</p></div>)

    const submitHandler = async (data: any) => {
        const userId = user?.sub;
        await updateBookRating(isbn, Number(data.rating), userId);
        setOpen(prev => !prev);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <fieldset>
                <legend>Valora el libro</legend>
                <div className="w-full flex flex-row justify-between flex-nowrap py-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex flex-row gap-2" style={{ marginRight: "10px" }}>
                            <input
                                type="radio"
                                value={value}
                                {...register("rating", { required: "Please select a rating." })}
                            />
                            {value}
                        </label>
                    ))}
                </div>
                {errors.rating && (
                    <p style={{ color: "red", fontSize: "12px" }}>{(errors as any).rating.message}</p>
                )}
            </fieldset>
            <Button type="submit">Votar</Button>
            <Button onClick={() => { setOpen(prev => !prev); }} color="danger">Cerrar</Button>
        </form>
    );
};

export default RatingForm;
