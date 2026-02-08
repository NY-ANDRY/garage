import { ref as vueRef, onMounted, onUnmounted, watch, Ref } from "vue";
import { collection, onSnapshot, Unsubscribe, DocumentData, query, orderBy as fbOrderBy, QueryConstraint, } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export function useFirestoreCollection<T extends DocumentData>(
  collectionName: string,
  orderByField?: string,
  orderByDirection: "asc" | "desc" = "desc"
) {
  const data: Ref<(T & { id: string })[]> = vueRef([]);
  const loading = vueRef<boolean>(true);

  let unsubscribe: Unsubscribe | null = null;

  const subscribe = (name: string): void => {
    if (!name) return;

    loading.value = true;

    const constraints: QueryConstraint[] = [];

    if (orderByField) {
      constraints.push(fbOrderBy(orderByField, orderByDirection));
    }

    const colRef = collection(firestore, name);
    const q = constraints.length ? query(colRef, ...constraints) : colRef;

    unsubscribe = onSnapshot(
      q,
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
