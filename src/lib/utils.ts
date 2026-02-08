// utils.ts
import { Timestamp } from "firebase/firestore";

/** 
 * Formate un Timestamp Firestore en HH:mm
 */
export function formatTime(ts?: Timestamp | null): string {
  if (!ts) return '';

  return ts
    .toDate()
    .toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
}

/**
 * Date courte (ex: 07/02/2026)
 */
export function formatDate(ts?: Timestamp | null): string {
  if (!ts) return '';

  return ts.toDate().toLocaleDateString('fr-FR');
}

export function formatDate0(ts?: Timestamp | null): string {
  if (!ts) return '';

  return ts.toDate().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
  });
}

/**
 * Date + heure (ex: 07/02/2026 à 14:07)
 */
export function formatDateTime(ts?: Timestamp | null): string {
  if (!ts) return '';

  const d = ts.toDate();

  return `${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}