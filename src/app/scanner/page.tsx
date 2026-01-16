"use client";
import { useEffect, useState } from "react";
import { getBookByIsbn } from "../lib/books";
import { getBookReadByIsbn } from "../lib/reads";
import { getCategories } from "../lib/categories";
import AddReadModal from "../components/Books/Modal/AddReadModal";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { toast } from "sonner";
import BarcodeScanner from "../components/BarcodeScanner";

const ScannerPage = () => {
    const [isbn, setIsbn] = useState<string>("");
    const [openScanner, setOpenScanner] = useState<boolean>(false);
    const [book, setBook] = useState<any>();
    const [categories, setCategories] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        if (isbn && isbn.length) {
            setOpenScanner(false);
            setIsFetching(true);
            getCategories().then(res => setCategories(res));

            getBookReadByIsbn(isbn).then(res => {
                if (res) {
                    setBook(res[0]);
                    setOpen(true);
                    setIsFetching(false);
                }
                if (!res || !res.length) {
                    getBookByIsbn(isbn).then(res => {
                        setBook(res);
                        setOpen(true);
                        setIsFetching(false);
                        setOpenScanner(true);
                    }).catch(err => {
                        if (err instanceof Error) {
                            toast.error(err.message);
                        } else {
                            toast.error(err.response.data.message);
                        }
                        resetScannerPage();
                    });
                }
            }).catch(err => {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error(err.response.data.message);
                }
                resetScannerPage();
            });
        }
    }, [isbn]);

    const handleInputChange = (evt: any) => {
        if (evt.target.value && evt.target.value.length === 13) {
            setIsbn(evt.target.value);
        }
    }

    const resetScannerPage = () => {
        setIsbn("");
        setOpenScanner(false);
        setBook(undefined);
        setCategories(undefined);
        setOpen(false);
        setIsFetching(false);
    }

    return (
        <div className="w-full min-h-[calc(100vh-120px)] bg-neutral-50 flex flex-col">
            {/* Scanner active */}
            {openScanner && !book ? (
                <BarcodeScanner
                    onDetected={(isbn: string) => setIsbn(isbn)}
                    onClose={() => setOpenScanner(false)}
                />
            ) : isFetching ? (
                <div className="w-full flex-1 flex flex-col justify-center items-center gap-4">
                    <CircularProgress color="primary" />
                    <p className="text-neutral-600 text-sm">Buscando libro...</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 gap-6">
                    {/* Icon */}
                    <div className="text-6xl text-primary-600">
                        <i className="fa-solid fa-barcode"></i>
                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Escanear libro</h1>
                        <p className="text-neutral-600">Usa el escáner o introduce el ISBN manualmente</p>
                    </div>

                    {/* Input */}
                        <Input
                            isClearable
                            type="text"
                            placeholder="Introduce el ISBN (13 dígitos)"
                            onChange={handleInputChange}
                            size="lg"
                            classNames={{
                                label: "text-neutral-700 font-medium",
                                input: "text-center text-lg font-mono",
                            }}
                            variant="underlined"
                        />

                    {/* Scanner button */}
                    <Button
                        onClick={() => setOpenScanner(true)}
                        className="w-full max-w-sm h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base"
                        startContent={<i className="fa-solid fa-camera"></i>}
                    >
                        Abrir cámara
                    </Button>

                    {/* Help text */}
                    <div className="w-full max-w-sm mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                        <p className="text-sm text-primary-900 text-center">
                            <i className="fa-solid fa-info-circle mr-2"></i>
                            El ISBN tiene 13 dígitos y se encuentra en la contraportada del libro
                        </p>
                    </div>
                </div>
            )}

            {/* Modal */}
            {book && book.book ? (
                <AddReadModal
                    book={book.book}
                    open={open}
                    categories={categories}
                    handleClose={resetScannerPage}
                />
            ) : undefined}
        </div>
    )
}

export default ScannerPage;