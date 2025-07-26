export interface Lending {
    _id: string;
    book: { _id: string; title: string } | string;
    reader: { _id: string; name: string } | string;
    borrowDate: Date;
    dueDate: Date;
    status: 'borrowed' | 'returned' | 'overdue';
}

export type LendingData = Omit<Lending, '_id'>;
