import { ref as vueRef, onMounted, onUnmounted, watch, Ref } from "vue";
import { collection, onSnapshot, Unsubscribe, query, where, orderBy as fbOrderBy, QueryConstraint } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";
import { useAuthStore } from "@/stores/auth";
import type { Notification } from "@/types/types";

export function useFirestoreNotifications(orderByField?: string, orderByDirection: "asc" | "desc" = "desc") {
  const authStore = useAuthStore();

  const data: Ref<(Notification & { id: string })[]> = vueRef([]);
  const loading = vueRef<boolean>(true);

  let unsubscribe: Unsubscribe | null = null;

  const subscribe = () => {
    if (!authStore.user?.uid) {
      data.value = [];
      loading.value = false;
      return;
    }

    loading.value = true;

    const constraints: QueryConstraint[] = [where("user.uid", "==", authStore.user.uid)];

    if (orderByField) {
      constraints.push(fbOrderBy(orderByField, orderByDirection));
    }

    const colRef = collection(firestore, "notifications");
    const q = query(colRef, ...constraints);

    if (unsubscribe) unsubscribe();

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        data.value = snapshot.docs.map((doc) => ({
          ...(doc.data() as Notification),
          id: doc.id,
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
    if (authStore.initialized) {
      subscribe();
    }
  });

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
