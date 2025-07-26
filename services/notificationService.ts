

import apiClient from "./apiClient";

export const sendOverdueNotification = async (data: {
    to: string;
    subject: string;
    message: string;
}) => {
    return await apiClient.post("/notification/send-notification", data); // <- /send-notification is correct
};

