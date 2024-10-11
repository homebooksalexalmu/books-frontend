"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const BookDataTable = ({ data }: { data: { pages?: number; format?: string; publisher?: string; } }) => {

    return (
        <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Editorial</TableColumn>
                <TableColumn>Páginas</TableColumn>
                <TableColumn>Formato</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>{data.publisher ?? "N/A"}</TableCell>
                    <TableCell>{data.pages ?? "N/A"}</TableCell>
                    <TableCell>{data.format ?? "N/A"}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
};

export default BookDataTable;