import { ref } from "vue";
import {
    doc,
    updateDoc,
    setDoc,
    deleteDoc,
    DocumentData
} from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";

type MutationType = "update" | "set" | "delete";

export function useFirestoreMutation<T extends DocumentData>(
    collectionName: string
) {
    const loading = ref(false);
    const error = ref<Error | null>(null);

    const mutate = async (
        id: string,
        payload?: any,
        type: MutationType = "update"
    ): Promise<void> => {
        loading.value = true;
        error.value = null;

        try {
            const docRef: any = doc(firestore, collectionName, id);

            if (type === "update" && payload) {
                await updateDoc(docRef, payload);
            }

            if (type === "set" && payload) {
                await setDoc(docRef, payload, { merge: true });
            }

            if (type === "delete") {
                await deleteDoc(docRef);
            }
        } catch (e) {
            error.value = e as Error;
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return {
        mutate,
        loading,
        error
    };
}
