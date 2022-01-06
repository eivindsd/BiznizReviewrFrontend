export interface IUser {
    _id: String,
    userId: string,
    name: String,
    password: String,
    reviews: IReview[],
    friends: IFriends[],
    admin?: boolean
}

export interface IReview {
    reviewId: String,
    businessId: String,
    userId: String,
    stars: Number,
    text: String,
    business_name?: String
    user_name?: String
}

export interface IFriends {
    friendId: String,
    friendName: String,
}