import React from "react";
import type {Reader} from "../../type/Reader.ts";


interface ReaderTableProps {
    readers: Reader[];
    onEdit?: (reader: Reader) => void;
    onDelete?: (id: string) => void;
}

const ReaderTable: React.FC<ReaderTableProps> = ({ readers, onEdit, onDelete }) => {

    const formatDate = (date?: Date | string) => {
        if (!date) return "N/A";

        // If date is a Date object, convert to ISO string
        const d = typeof date === "string" ? new Date(date) : date;

        // Format as YYYY-MM-DD
        return d.toISOString().slice(0, 10);
    };

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                <tr>
                    <th className="px-4 py-3">Membership ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Membership Date</th>
                    <th className="px-4 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {readers.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-500">
                            No readers found.
                        </td>
                    </tr>
                ) : (
                    readers.map((reader) => (
                        <tr
                            key={reader._id}
                            className="border-t border-gray-200 hover:bg-gray-50 transition"
                        >
                            <td className="px-4 py-3">{reader.membershipId}</td>
                            <td className="px-4 py-3">{reader.name}</td>
                            <td className="px-4 py-3">{reader.email}</td>
                            <td className="px-4 py-3">{reader.contact}</td>
                            <td className="px-4 py-3">{formatDate(reader.membershipDate)}</td>
                            <td className="px-4 py-3 space-x-2">
                                {onEdit && (
                                    <button
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                        onClick={() => onEdit(reader)}
                                    >
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                        onClick={() => onDelete(reader._id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReaderTable;
