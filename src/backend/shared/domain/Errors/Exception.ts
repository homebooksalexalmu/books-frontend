
export class Exception extends Error {
    status: number;
    name: string;

    constructor(status: number, name: string, message: string) {
        super(message);
        this.status = status;
        this.name = name;
    }
}