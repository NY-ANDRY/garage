import { Timestamp } from "firebase/firestore";

export type Notification = {
    id: string;
    title: string;
    description?: string;
    read: boolean;
    url_img?: string;
    date: Timestamp;
};
