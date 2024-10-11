

export enum BookReadsStatus {
    INACTIVE = "INACTIVE",
    PENDING_TO_BUY = "PENDING_TO_BUY",
    PENDING_TO_READ = "PENDING_TO_READ",
    IN_PROGRESS = "IN_PROGRESS",
    INCOMPLETE = "INCOMPLETE",
    COMPLETE = "COMPLETE"
}

export const getColorsByStatus = (status: string) => {
    switch (status) {
        case String(BookReadsStatus.PENDING_TO_BUY):
            return "bg-slate-400 text-black";
        case String(BookReadsStatus.PENDING_TO_READ):
            return "bg-slate-400 text-black";
        case String(BookReadsStatus.IN_PROGRESS):
            return "bg-orange-400 text-black";
        case String(BookReadsStatus.INCOMPLETE):
            return "bg-red-400 text-white";
        case String(BookReadsStatus.COMPLETE):
            return "bg-green-400 text-black";
        case String(BookReadsStatus.INACTIVE):
        default:
            return "bg-slate-400 text-black";
    }
}

export const getStatusName = (status: string) => {
    const translations = {
        [BookReadsStatus.INACTIVE]: "Inactivo",
        [BookReadsStatus.PENDING_TO_BUY]: "Pendiente de comprar",
        [BookReadsStatus.PENDING_TO_READ]: "Pendiente de leer",
        [BookReadsStatus.IN_PROGRESS]: "Leyendo",
        [BookReadsStatus.INCOMPLETE]: "Incompleto",
        [BookReadsStatus.COMPLETE]: "Completado",
    };
    return translations[status as keyof typeof translations];
}