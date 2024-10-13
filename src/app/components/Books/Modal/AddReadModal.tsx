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
            categories: [""],
        },
        onSubmit: async (values) => {
            if (!user || !user.sub) throw new Error("Cannot get user");

            if (values.categories) {
                await updateBookCategories(book._id, [values.categories].flat());
            }

            await handleCreateRead({ ...values, book: book._id, user: user.sub })

            handleClose();
        },
    });

    const handleCreateRead = async (readCreate: { user: string; book: string; status: string }) => {
        await createRead(readCreate);
    }

    const isRead = () => book.userReads && Array.isArray(book.userReads);
    return (
        <Modal hideCloseButton isOpen={open === true && book} className="max-h-[95vh]">
            <ModalContent className="max-h-[95vh] overflow-auto">
                {(onClose) => (
                    <>
                        <form onSubmit={formik.handleSubmit} className="w-full">
                            <ModalHeader className="flex flex-col gap-1">{book.title}</ModalHeader>
                            <ModalBody className="flex flex-col justify-center items-center">
                                <Image src={book.portrait} alt={book._id} width={200} height={110} className="shadow-xl" />
                                {
                                    !isRead() ? (
                                        <div className="w-full">
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
                                <Button color="danger" variant="light" onPress={handleClose}>
                                    Cerrar
                                </Button>
                                {!isRead() ? (
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