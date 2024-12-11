import { Nullable } from "@/backend/shared/domain/utils";

export class BookPortraitVO {
    DEFAULT_COVER_IMAGE = "https://res.cloudinary.com/dak7ewo4r/image/upload/v1728321097/iawijkqybeyosuy0oltp.jpg";
    portrait: string;

    constructor(_portrait: Nullable<string>) {
        this.portrait = this.ensureBookPortraitExistsOrReplaceWithDefault(_portrait);
    }

    private ensureBookPortraitExistsOrReplaceWithDefault(portrait: Nullable<string>) {
        return portrait ?? this.DEFAULT_COVER_IMAGE;
    }

    get value() {
        return this.portrait;
    }

}