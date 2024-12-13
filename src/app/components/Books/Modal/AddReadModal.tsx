"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { BookReadsStatus, getStatusName } from "@/app/utils";
import BookPageUsersTabs from "@/app/components/Books/ReadsUserTabs";
import { useFormik } from "formik";
import { createRead } from "@/app/lib/reads";
import { useUser } from "@auth0/nextjs-auth0/client";
import { updateBookCategories } from "@/app/lib/books";

const AddReadModal = ({ open, book, categories, handleClose }: { book: any; open: boolean; categories: Array<any>; handleClose: () => void }) => {
    const { user } = useUser();
    const formik = useFormik({
        initialValues: {
            status: "",
            categories: "",
        },
        onSubmit: async (values) => {
            if (!user || !user.sub) throw new Error("Cannot get user");
            const formattedCategories = values.categories.split(",");
            if (values.categories) {
                await updateBookCategories(book._id, formattedCategories);
            }

            await handleCreateRead({ ...values, book: book._id, user: user.sub })

            handleClose();
        },
    });

    const handleCreateRead = async (readCreate: { user: string; book: string; status: string }) => {
        await createRead(readCreate);
    }

    const isRead = () => book && book.userReads && Array.isArray(book.userReads);
    const isOwnRead = () => book && book.userReads?.some((read: any) => read.user.sub === user?.sub && read.status !== BookReadsStatus.INACTIVE);
    return (
        <Modal hideCloseButton isOpen={open === true && book} className="max-h-[95vh] pb-24 md:pb-0 z-[9999]">
            <ModalContent className="h-auto max-h-[95vh] lg:max-h-max overflow-auto">
                {(onClose) => (
                    <>
                        <form onSubmit={formik.handleSubmit} className="w-full">
                            <ModalHeader className="flex flex-col gap-1">{book.title}</ModalHeader>
                            <ModalBody className="flex flex-col justify-center items-center">
                                <Image src={book.portrait} alt={book._id} width={200} height={110} className="shadow-xl" />
                                {
                                    !isRead() || isRead() && !isOwnRead() ? (
                                        <div className="w-full flex flex-col justify-center items-center gap-5">
                                            <Select
                                                label="Elige un estado"
                                                className="max-w-xs"
                                                onChange={(e) => formik.setFieldValue("status", e.target.value)}
                                                value={formik.values.status}
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
                                                onChange={(e) => formik.setFieldValue("categories", e.target.value)}
                                                value={formik.values.categories}
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
                                <Button onClick={handleClose} color="danger" variant="light">
                                    Cerrar
                                </Button>
                                {!isRead() || isRead() && !isOwnRead() ? (
                                    <Button color="primary" type="submit" onPress={onClose}>
                                        Guardar
                                    </Button>
                                ) : null}
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AddReadModal;