import { ref as vueRef, onMounted, onUnmounted, watch } from "vue";
import { ref as dbRef, onValue, off } from "firebase/database";
import { realtimeDb } from "../config/firebaseConfig";

export function useRealtimeData(dbName: string) {
  const data = vueRef<any[]>([]);
  let firebaseRef: any = null;

  const subscribe = (name: string) => {
    if (!name) return;

    firebaseRef = dbRef(realtimeDb, name);

    onValue(firebaseRef, (snapshot) => {
      if (snapshot.exists()) {
        data.value = Object.values(snapshot.val());
      } else {
        data.value = [];
      }
    });
  };

  onMounted(() => {
    subscribe(dbName);
  });

  onUnmounted(() => {
    if (firebaseRef) {
      off(firebaseRef);
    }
  });

  // Si dbName peut changer dynamiquement
  watch(
    () => dbName,
    (newName) => {
      if (firebaseRef) off(firebaseRef);
      subscribe(newName);
    }
  );

  return {
    data,
  };
}
