import { CategoryId } from "./CategoryId";
import { CategorySlug } from "./CategorySlug";

export class Category {
    _id?: CategoryId;
    name: string;
    slug: CategorySlug;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: {
        _id?: CategoryId
        name: string;
        slug: CategorySlug;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this._id = props._id;
        this.name = props.name;
        this.slug = props.slug;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    toPrimitives() {
        return {
            _id: this._id!.value,
            name: this.name,
            slug: this.slug.value,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromPrimitives(plainData: {
        _id: string;
        name: string;
        slug: CategorySlug;
        createdAt: Date;
        updatedAt: Date;
    }): Category {
        return new Category({
            _id: new CategoryId(plainData._id),
            name: plainData.name,
            slug: new CategorySlug(plainData.name),
            createdAt: plainData.createdAt,
            updatedAt: plainData.updatedAt,
        });
    }
}