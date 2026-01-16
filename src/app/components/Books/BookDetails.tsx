"use client";
import { Card, CardBody } from "@nextui-org/react";

interface BookDetailsProps {
    publisher?: string;
    pages?: number;
    format?: string;
}

export const BookDetails = ({ publisher, pages, format }: BookDetailsProps) => {
    const details = [
        { label: "Editorial", value: publisher ?? "N/A", icon: "fa-building" },
        { label: "Páginas", value: pages ?? "N/A", icon: "fa-book-open" },
        { label: "Formato", value: format ?? "N/A", icon: "fa-rectangle-landscape" },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
            {details.map((detail) => (
                <Card key={detail.label} className="bg-white border border-neutral-200 hover:shadow-md transition">
                    <CardBody className="flex flex-col items-center justify-center gap-2 p-4">
                        <i className={`fa-solid ${detail.icon} text-2xl text-primary-600`}></i>
                        <p className="text-xs text-neutral-600 uppercase font-semibold tracking-wide">{detail.label}</p>
                        <p className="text-center text-sm font-semibold text-neutral-900 line-clamp-2">{detail.value}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};
