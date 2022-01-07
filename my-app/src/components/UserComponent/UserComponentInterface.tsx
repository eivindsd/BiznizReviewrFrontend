export interface IUser {
    _id: string,
    userId: string,
    name: string,
    password: string,
    reviews: IReview[],
    admin?: boolean
}

export interface IReview {
    reviewId: string,
    businessId: string,
    userId: string,
    stars: number,
    text: string,
    business_name?: string
    user_name?: string
}

export interface IFriends {
    userId: string,
    name: string,
}

export interface ISuggestedUser {
    userId: string,
    name: string
}