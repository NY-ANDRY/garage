import { ref as vueRef, onMounted, onUnmounted, watch, Ref } from "vue";
import { doc, onSnapshot, Unsubscribe, DocumentData } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export function useFirestoreDoc<T extends DocumentData>(
  collectionName: string,
  docId: Ref<string | null>
) {
  const data: Ref<(T & { id: string }) | null> = vueRef(null);
  const loading = vueRef<boolean>(true);

  let unsubscribe: Unsubscribe | null = null;

  const subscribe = (id: string) => {
    loading.value = true;

    const docRef = doc(firestore, collectionName, id);

    unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        data.value = snapshot.exists()
          ? { id: snapshot.id, ...(snapshot.data() as T) }
          : null;

        loading.value = false;
      },
      (error) => {
        console.error("Firestore error:", error);
        loading.value = false;
      }
    );
  };

  watch(
    docId,
    (newId) => {
      if (unsubscribe) unsubscribe();

      if (newId) {
        subscribe(newId);
      } else {
        data.value = null;
        loading.value = false;
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return { data, loading };
}
