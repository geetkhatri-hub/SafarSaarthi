/**
 * Verida — Firebase Configuration & Hybrid Storage Engine
 * Connects to Google Cloud Firestore & Firebase Auth when credentials are supplied,
 * or gracefully runs in local reactive storage mode with identical API.
 */

// Default Firebase Configuration template (Developers can drop in their live config)
export const firebaseConfig = {
  apiKey: "AIzaSyDEMO-KEY-FOR-VERIDA-STAGE-TEST",
  authDomain: "verida-trust-platform.firebaseapp.com",
  projectId: "verida-trust-platform",
  storageBucket: "verida-trust-platform.appspot.com",
  messagingSenderId: "98234190823",
  appId: "1:98234190823:web:a1098bca4827"
};

// Check if live Firebase SDK is loaded globally
export const isFirebaseLoaded = () => {
  return typeof window.firebase !== "undefined" && window.firebase.apps && window.firebase.apps.length > 0;
};

class HybridStore {
  constructor() {
    this.storageKeyPrefix = "verida_data_";
    this.listeners = new Map();
  }

  getCollection(collectionName) {
    try {
      const raw = localStorage.getItem(this.storageKeyPrefix + collectionName);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn(`[Verida Store] Read error for ${collectionName}:`, e);
      return [];
    }
  }

  saveCollection(collectionName, items) {
    try {
      localStorage.setItem(this.storageKeyPrefix + collectionName, JSON.stringify(items));
      this.notify(collectionName, items);
    } catch (e) {
      console.error(`[Verida Store] Save error for ${collectionName}:`, e);
    }
  }

  async addDocument(collectionName, data) {
    const items = this.getCollection(collectionName);
    const newDoc = {
      id: data.id || `${collectionName.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
      ...data
    };
    items.unshift(newDoc);
    this.saveCollection(collectionName, items);

    // If live Firestore is available, sync in background
    if (isFirebaseLoaded() && window.firebase.firestore) {
      try {
        const db = window.firebase.firestore();
        await db.collection(collectionName).doc(newDoc.id).set(newDoc);
      } catch (err) {
        console.log(`[Verida Firebase Sync] Offline or demo mode active for ${collectionName}:`, err.message);
      }
    }

    return newDoc;
  }

  async getDocuments(collectionName, filterFn = null) {
    let items = this.getCollection(collectionName);
    if (filterFn && typeof filterFn === "function") {
      items = items.filter(filterFn);
    }
    return items;
  }

  subscribe(collectionName, callback) {
    if (!this.listeners.has(collectionName)) {
      this.listeners.set(collectionName, new Set());
    }
    this.listeners.get(collectionName).add(callback);

    // Call initially with current data
    callback(this.getCollection(collectionName));

    // Return unsubscribe function
    return () => {
      if (this.listeners.has(collectionName)) {
        this.listeners.get(collectionName).delete(callback);
      }
    };
  }

  notify(collectionName, data) {
    if (this.listeners.has(collectionName)) {
      this.listeners.get(collectionName).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error("[Verida Store] Listener error:", err);
        }
      });
    }
  }
}

export const hybridStore = new HybridStore();
