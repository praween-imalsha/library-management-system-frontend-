// Full Reader type
export type Reader = {
    _id: string;
    membershipId: string;
    name: string;
    email: string;
    contact: string;
    membershipDate?: Date;
    createdAt?: string;
    updatedAt?: string;
}


export type ReaderData = {
    membershipId: string;
    name: string;
    email: string;
    contact: string;
}
