import { ref as vueRef, onMounted, onUnmounted, watch } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export function useFirestoreData(collectionName: string) {
  const data = vueRef<any[]>([]);
  let unsubscribe: (() => void) | null = null;

  const subscribe = (name: string) => {
    if (!name) return;

    const colRef = collection(firestore, name);

    unsubscribe = onSnapshot(colRef, (snapshot) => {
      data.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
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

  return { data };
}
