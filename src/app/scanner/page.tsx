"use client";
import { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { getBookByIsbn } from "../lib/books";
import { getBookReadByIsbn } from "../lib/reads";
import { getCategories } from "../lib/categories";

import AddReadModal from "../components/Books/Modal/AddReadModal";

const ScannerPage = () => {
    const [isbn, setIsbn] = useState<string>("");
    const [openScanner, setOpenScanner] = useState<boolean>(isbn !== undefined && !isbn.length);
    const [book, setBook] = useState<any>();
    const [categories, setCategories] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isbn && isbn.length) {
            getCategories().then(res => setCategories(res));

            getBookReadByIsbn(isbn).then(res => {
                if (res[0]) {
                    setBook(res[0]);
                    setOpen(true);
                }
                if (!res || !res.length) {
                    getBookByIsbn(isbn).then(res => {
                        setBook(res);
                        setOpen(true);
                    });
                }
            });
        }
    }, [isbn]);

    const resetScannerPage = () => {
        setIsbn("");
        setOpenScanner(true);
        setBook(undefined);
        setCategories(undefined);
        setOpen(false);
    }

    return (
        <div className="w-full h-screen overflow-hidden">
            {
                openScanner ? (<BarcodeScannerComponent onUpdate={(err, result) => {
                    if (result && (result as any).text.length > 1) {
                        setIsbn((result as any).text);
                        setOpenScanner(false);
                    }
                    else setIsbn("");
                }} />) : <div>
                    <p>{isbn}</p>
                    <pre>
                        <code>{JSON.stringify(book, null, 2)}</code>
                    </pre>
                </div>
            }
            <AddReadModal book={book} open={open} categories={categories} handleClose={resetScannerPage} />
        </div>
    )
}

export default ScannerPage;