import { ref as vueRef, onMounted, onUnmounted, watch } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export function useFirestoreData(collectionName: string) {
  const data = vueRef<any[]>([]);
  const loading = vueRef(true); // ← nouvelle variable
  let unsubscribe: (() => void) | null = null;

  const subscribe = (name: string) => {
    if (!name) return;

    loading.value = true; // on commence le chargement
    const colRef = collection(firestore, name);

    unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        data.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        loading.value = false; // données chargées
      },
      (error) => {
        console.error("Firestore error:", error);
        loading.value = false; // arrêt du loading en cas d'erreur
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

  return { data, loading }; // ← renvoie maintenant loading
}
