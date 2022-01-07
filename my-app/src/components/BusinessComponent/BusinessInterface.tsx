import { IReview } from "../UserComponent/UserComponentInterface";

export interface IBusiness {
    _id: string,
    businessId: string,
    name: string,
    country: string,
    city: string,
    state?: string,
    topTags?: string[] | null,
    categories?: string[] | null
    reviews: IReview[]
}