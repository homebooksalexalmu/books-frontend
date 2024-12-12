"use client"
import { useState } from "react";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import RatingForm from "../Edit/RatingForm";

const RatingModal = ({ isbn }: { isbn: string }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => { setOpen(prev => !prev) }} color="primary" variant="bordered" size="sm" className="flex flex-row items-center z-10 cursor-pointer">
                <i className="fa-regular fa-star"></i>
                Reseña
            </Button>
            <Modal hideCloseButton isOpen={open === true} className="max-h-[95vh] pb-24 md:pb-0 z-[9999]">
                <ModalContent className="h-auto max-h-[95vh] lg:max-h-max overflow-auto">
                    {() => (
                        <main className="p-4">
                            <RatingForm isbn={isbn} setOpen={setOpen} />
                        </main>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default RatingModal;