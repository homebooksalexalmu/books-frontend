"use client";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface BookSynopsisProps {
    description?: string;
}

export const BookSynopsis = ({ description }: BookSynopsisProps) => {
    if (!description) return null;

    return (
        <Card className="bg-white border border-neutral-200">
            <CardHeader className="flex gap-3 px-6 py-4">
                <i className="fa-solid fa-book-bookmark text-2xl text-primary-600"></i>
                <div className="flex flex-col">
                    <p className="text-lg font-bold text-neutral-900">Sinopsis</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4 px-6 py-4">
                <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap text-base">{description}</p>
            </CardBody>
        </Card>
    );
};
