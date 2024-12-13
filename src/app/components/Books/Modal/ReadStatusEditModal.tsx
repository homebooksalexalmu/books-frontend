"use client"
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getBookReadByIsbn, updateBookReadByIsbnAndUser } from "@/app/lib/reads";
import { BookReadsStatus, getStatusName } from "@/app/utils";
import { useForm } from "react-hook-form";

const ReadStatusModal = ({ isbn }: { isbn: string }) => {
    const { user, isLoading } = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const [readStatus, setReadStatus] = useState<string>();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            status: "",
        },
    });

    useEffect(() => {
        const fetchReadByIsbn = async () => {
            if (user && !isLoading) {
                const reads = await getBookReadByIsbn(isbn);
                const readOfCurrentUser = reads.userReads.find((userRead: any) => userRead.user.sub === user.sub);
                if (!readOfCurrentUser) return;
                setReadStatus(readOfCurrentUser.status);
            }
        }
        fetchReadByIsbn();
    }, [user, isLoading, isbn]);

    useEffect(() => {
        if (readStatus) {
            reset({ status: readStatus });
        }
    }, [readStatus, reset]);

    const onSubmit = async (data: any) => {
        if (!user || !user.sub) return undefined;
        await updateBookReadByIsbnAndUser(isbn, user?.sub, data.status);
        setOpen(prev => !prev);
    };

    return (
        <>
            <Button onClick={() => { setOpen(prev => !prev) }} color="primary" variant="bordered" size="sm" className="flex flex-row items-center z-10 cursor-pointer">
                <i className="fa-brands fa-readme"></i>
                Estado de la lectura
            </Button>
            <Modal hideCloseButton isOpen={open === true} className="max-h-[95vh] pb-24 md:pb-0 z-[9999]">
                <ModalContent className="h-auto max-h-[95vh] lg:max-h-max overflow-auto">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Estado de la lectura</ModalHeader>
                            <ModalBody className="p-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Select className="w-full" label="Estado lectura" placeholder="Seleccione estado" id="status" {...register("status")}>
                                        {Object.values(BookReadsStatus).map((status) => (
                                            <SelectItem key={status}>{getStatusName(status)}</SelectItem>
                                        ))}
                                    </Select>
                                    <ModalFooter>
                                        <Button onClick={() => setOpen(prev => !prev)} color="danger" variant="light">
                                            Cerrar
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Cambiar estado
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReadStatusModal;