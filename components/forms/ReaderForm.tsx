import React, { useState, useEffect } from "react";
import type { Reader, ReaderData } from "../../type/Reader";

interface ReaderFormProps {
    reader?: Reader | null;
    onSubmit: (data: ReaderData) => void;
}

const ReaderForm: React.FC<ReaderFormProps> = ({ reader, onSubmit }) => {
    const [formData, setFormData] = useState<ReaderData>({
        membershipId: "",
        name: "",
        email: "",
        contact: "",
    });

    const [errors, setErrors] = useState<Record<keyof ReaderData, string>>({
        membershipId: "",
        name: "",
        email: "",
        contact: "",
    });

    useEffect(() => {
        if (reader) {
            setFormData({
                membershipId: reader.membershipId,
                name: reader.name,
                email: reader.email,
                contact: reader.contact,
            });
        } else {
            setFormData({
                membershipId: "",
                name: "",
                email: "",
                contact: "",
            });
        }

        setErrors({
            membershipId: "",
            name: "",
            email: "",
            contact: "",
        });
    }, [reader]);

    const validateForm = (): boolean => {
        const newErrors: Record<keyof ReaderData, string> = {
            membershipId: "",
            name: "",
            email: "",
            contact: "",
        };

        if (!formData.membershipId.trim()) {
            newErrors.membershipId = "Membership ID is required";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        const contactRegex = /^[0-9]{10,15}$/;
        if (!formData.contact.trim() || !contactRegex.test(formData.contact)) {
            newErrors.contact = "Contact must be 10–15 digits";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((msg) => msg === "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof ReaderData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {(["membershipId", "name", "email", "contact"] as const).map((field) => (
                <div key={field}>
                    <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                    >
                        {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                        id={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={`Enter ${field}`}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors[field]
                                ? "border-red-400 ring-red-300"
                                : "border-gray-300 ring-indigo-500"
                        }`}
                    />
                    {errors[field] && (
                        <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
                {reader ? "Update Reader" : "Add Reader"}
            </button>
        </form>
    );
};

export default ReaderForm;
