import {
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
  DocumentData
} from "firebase/firestore";

import { ref } from "vue";
import { firestore } from "@/config/firebaseConfig";

type MutationType = "update" | "set" | "delete";

export function useFirestoreMutation<T extends DocumentData>(
  collectionName: string
) {
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const mutate = async (
    payload?: T,
    options?: {
      type?: MutationType;
      id?: string;
    }
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const type = options?.type ?? "update";

      // 🔹 SET (sans id)
      if (type === "set" && payload) {
        const colRef = collection(firestore, collectionName);
        await addDoc(colRef, payload);
        return;
      }

      // 🔹 UPDATE / DELETE (id obligatoire)
      if (!options?.id) {
        throw new Error("ID requis pour update ou delete");
      }

      const docRef = doc(firestore, collectionName, options.id);

      if (type === "update" && payload) {
        await updateDoc(docRef, payload);
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
