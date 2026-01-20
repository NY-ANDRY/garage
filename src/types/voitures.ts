import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type Voiture = {
    id: string;
    numero: string;
    nom: string;
    description?: string;
    url_img?: string;
    couleurHex?: string;
    marque?: string;
    annee?: string;
    user?: any;
};
