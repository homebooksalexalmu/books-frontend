import { NextRequest, NextResponse } from "next/server";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { UserService } from "@/backend/Users/application/UserService";

export class UserCreatorController {

    constructor(private readonly userCreator: UserService) {}

    async run(req: NextRequest) {
        try {
            const body = req.json();

            await this.userCreator.create(body);

            return NextResponse.json({ messsage: "Created!" }, {status: 201});
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }

}