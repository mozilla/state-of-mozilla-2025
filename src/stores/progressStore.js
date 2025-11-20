import { writable } from "svelte/store";

const PROGRESS_KEY = "progress";
const INITIAL_PROGRESS = {
  stakes: false,
  code: false,
  tools: false,
  rebels: false,
  ledger: false,
  pledge: false,
};

function createProgressStore() {
  // Initialize from localStorage or use defaults
  let initialValue = INITIAL_PROGRESS;

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      try {
        initialValue = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse progress from localStorage:", e);
      }
    } else {
      // Initialize localStorage if it doesn't exist
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(INITIAL_PROGRESS));
    }
  }

  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    markAsViewed: (page) => {
      update((progress) => {
        const updated = { ...progress, [page]: true };
        if (typeof window !== "undefined") {
          localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
        }
        return updated;
      });
    },
    reset: () => {
      if (typeof window !== "undefined") {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(INITIAL_PROGRESS));
        sessionStorage.removeItem("captchaVerified");
        sessionStorage.removeItem("stopwallVerified");
      }
      set(INITIAL_PROGRESS);
    },
  };
}

export const progressStore = createProgressStore();
