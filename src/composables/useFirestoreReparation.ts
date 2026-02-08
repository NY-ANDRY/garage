import { ref as vueRef, onMounted, onUnmounted, watch, Ref } from "vue";
import { collection, onSnapshot, Unsubscribe, query, where, orderBy as fbOrderBy, QueryConstraint } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";
import { useAuthStore } from "@/stores/auth";
import type { Reparation } from "@/types/types";

export function useFirestoreReparation(orderByField?: string, orderByDirection: "asc" | "desc" = "desc") {
  const authStore = useAuthStore();

  const data: Ref<(Reparation & { id: string })[]> = vueRef([]);
  const loading = vueRef<boolean>(true);

  let unsubscribe: Unsubscribe | null = null;

  const subscribe = () => {
    if (!authStore.user?.uid) {
      data.value = [];
      loading.value = false;
      return;
    }

    loading.value = true;

    const constraints: QueryConstraint[] = [
      where("user.uid", "==", authStore.user.uid)
    ];

    if (orderByField) {
      constraints.push(fbOrderBy(orderByField, orderByDirection));
    }

    const colRef = collection(firestore, "reparations");
    const q = query(colRef, ...constraints);

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        data.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Reparation),
        }));
        loading.value = false;
      },
      (error) => {
        console.error("Firestore error:", error);
        loading.value = false;
      }
    );
  };

  onMounted(subscribe);

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  watch(
    () => [authStore.user?.uid, authStore.initialized],
    ([uid, initialized]) => {
      if (!initialized) return;
      subscribe();
    },
    { immediate: true }
  )

  return { data, loading };
}
