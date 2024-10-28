// src/providers/app-store-provider.tsx

'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

// Import types and functions from the store file
import {
  type AppStore, // Define the type for your store here
  createAppStore, // Function to initialize/create your store
  defaultInitState, // Default state to initialize your store
} from '@/stores/app-store'; // Adjust path to the location of your app store file

// Define the type for the store API returned by createAppStore
export type AppStoreApi = ReturnType<typeof createAppStore>;

// Create a context for the AppStore
export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

// Define the provider's props interface
export interface AppStoreProviderProps {
  children: ReactNode; // Child components that will use the context
}

// Create the provider component
export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  // Initialize the store only once using useRef
  const storeRef = useRef<AppStoreApi>();

  // Check if store is already initialized; if not, initialize it
  if (!storeRef.current) {
    storeRef.current = createAppStore(defaultInitState); // Pass the initial state
  }

  // Render the provider component with the store value
  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
};

// Custom hook to access the store with a selector function
export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  // Access the context to retrieve the store instance
  const appStoreContext = useContext(AppStoreContext);

  // Throw an error if hook is used outside of the provider
  if (!appStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  // Return the selected store value
  return useStore(appStoreContext, selector);
};
