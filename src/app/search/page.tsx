"use client";
import { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { getBookByIsbn } from "../lib/books";
import { getBookReadByIsbn } from "../lib/reads";
import { getCategories } from "../lib/categories";
import AddReadModal from "../components/Books/Modal/AddReadModal";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { toast } from "sonner";

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
                if (res[0]) {
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
                        toast.error(err.response.data.message);
                        resetScannerPage();
                    });
                }
            }).catch(err => {
                console.error(err);
                toast.error(err.response.data.message);
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
        <div className="w-full h-screen overflow-hidden">
            {
                openScanner && !book ? (<BarcodeScannerComponent onUpdate={(err, result) => {
                    if (result && (result as any).text.length > 1) {
                        setIsbn((result as any).text);
                        setOpenScanner(false);
                    }
                    else setIsbn("");
                }} />) : isFetching ?
                    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
                        <CircularProgress />
                    </div>
                    : (
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full flex flex-row justify-center items-center my-3">
                                <Input
                                    isClearable
                                    className="w-9/12 shadow-lg"
                                    type="text"
                                    label="ISBN"
                                    placeholder="Introduce el ISBN"
                                    variant="bordered"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button variant="bordered" onClick={() => { setOpenScanner(true) }}>Abrir Escaner</Button>
                        </div>
                    )
            }
            <AddReadModal book={book} open={open} categories={categories} handleClose={resetScannerPage} />
        </div>
    )
}

export default ScannerPage;