import { ref as vueRef, onMounted, onUnmounted, watch, Ref } from "vue";
import { collection, onSnapshot, Unsubscribe, DocumentData } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export function useFirestoreData<T extends DocumentData>(collectionName: string) {
  const data: Ref<(T & { id: string })[]> = vueRef([]);
  const loading = vueRef<boolean>(true);

  let unsubscribe: Unsubscribe | null = null;

  const subscribe = (name: string): void => {
    if (!name) return;

    loading.value = true;
    const colRef = collection(firestore, name);

    unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        data.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        loading.value = false;
      },
      (error) => {
        console.error("Firestore error:", error);
        loading.value = false;
      }
    );
  };

  onMounted(() => {
    subscribe(collectionName);
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  watch(
    () => collectionName,
    (newName) => {
      if (unsubscribe) unsubscribe();
      subscribe(newName);
    }
  );

  return { data, loading };
}
