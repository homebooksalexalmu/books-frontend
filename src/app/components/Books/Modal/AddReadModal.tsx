"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { BookReadsStatus, getStatusName } from "@/app/utils";
import BookPageUsersTabs from "@/app/components/Books/ReadsUserTabs";
import { useState } from "react";

const AddReadModal = ({ open, book, categories, handleClose }: { book: any; open: boolean; categories: Array<any>; handleClose: () => void }) => {
    const [] = useState();

    const isRead = () => book.userReads && Array.isArray(book.userReads);
    return (
        <Modal hideCloseButton isOpen={open === true && book} className="max-h-[95vh]">
            <ModalContent className="max-h-[95vh] overflow-auto">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{book.title}</ModalHeader>
                        <ModalBody className="flex flex-col justify-center items-center">
                            <Image src={book.portrait} alt={book._id} width={200} height={110} className="shadow-xl" />
                            {
                                !isRead() ? (
                                    <div className="w-full flex flex-col gap-2 mt-3">
                                        <Select
                                            label="Elige un estado"
                                            className="max-w-xs"
                                        >
                                            {Object.values(BookReadsStatus).map((status: string) => (
                                                <SelectItem key={status}>
                                                    {getStatusName(status)}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Select
                                            label="Elige categorías"
                                            selectionMode="multiple"
                                            className="max-w-xs"
                                        >
                                            {categories && categories.map((category: { _id: string; name: string; }) => (
                                                <SelectItem key={category._id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                ) : (<BookPageUsersTabs usersRead={book.userReads} />)
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                Cerrar
                            </Button>
                            {!isRead() ? (
                                <Button color="primary" onPress={onClose}>
                                    Guardar
                                </Button>
                            ) : null}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AddReadModal;