export type Book = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
}
export type BookData ={
    title: string;
    author: string;
    genre: string;
    quantity: number;
}