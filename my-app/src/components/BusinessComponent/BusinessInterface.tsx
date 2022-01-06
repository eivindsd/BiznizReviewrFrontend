import { IReview } from "../UserComponent/UserComponentInterface";

export interface IBusiness {
    _id: String,
    businessId: string,
    name: string,
    country: String,
    city: String,
    state?: String,
    topTags?: String[] | null,
    categories?: String[] | null
    reviews: IReview[]
}