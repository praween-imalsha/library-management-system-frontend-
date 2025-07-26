import { useState } from 'react';
import { sendOverdueNotification } from '../services/notificationService';
import toast from 'react-hot-toast';

const OverdueNotificationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        readerName: '',
        bookTitle: '',
        dueDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendOverdueNotification(formData);
            toast.success('✅ Email sent successfully!');
            setFormData({
                email: '',
                readerName: '',
                bookTitle: '',
                dueDate: '',
            });
        } catch (err) {
            console.error('❌ Error sending email:', err); // ✅ ESLint-compliant
            toast.error('❌ Failed to send email!');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-4"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">
                Send Overdue Notification 📧
            </h2>

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Reader Email"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                name="readerName"
                value={formData.readerName}
                onChange={handleChange}
                placeholder="Reader Name"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                placeholder="Book Title"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Send Notification
            </button>
        </form>
    );
};

export default OverdueNotificationForm;
