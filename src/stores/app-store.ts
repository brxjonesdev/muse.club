// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';
import { createClient } from '@/utils/supabase/client';

export type Recommendation = {
  id: string;
  created_at: string; // ISO 8601 date string
  youtube_url: string;
  youtube_thumbnail: string;
  song_artist: string;
  song_title: string;
  user_caption: string;
  poster: string; // ID of the user
  likes: Likes[];
};

export type Likes = {
  userID: string;
  recommendationID: string;
};

export type AppState = {
  userID: string; // Added userID to AppState
  totalRecommendations: number; // Fixed typo from "Reccomendations" to "Recommendations"
  recommendations: Recommendation[] | null;
  feedStatus: {
    loading: boolean;
    error: string | null;
  };
};

export type AppActions = {
  addRecommendation: (recommendation: Recommendation) => void;
  editRecommendation: (id: string, updatedRecommendation: Partial<Recommendation>) => void;
  deleteRecommendation: (id: string) => void;
  likeRecommendation: (userID: string, recommendationID: string) => void;
  unlikeRecommendation: (userID: string, recommendationID: string) => void;
  fetchRecommendations: () => Promise<void>; // Declare fetchRecommendations in actions
  setUserID: (userID: string) => void; // Added setUserID action
  fetchRecommndationTotal: () => Promise<void>; // Added fetchRecommndationTotal action
};

// Combine State and Actions into a single type
export type AppStore = AppState & AppActions;

// Default initial state with content
export const defaultInitState: AppState = {
  userID: '',
  totalRecommendations: 0,
  recommendations: null,
  feedStatus: {
    loading: false,
    error: null,
  },
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState, // Spread the initial state

    // Actions
    fetchRecommndationTotal: async () => {
      try {
        const supabase = await createClient();
        const response = await supabase.from('recommendations').select('id');
        set({ totalRecommendations: response.data ? response.data.length : 0 });
      } catch (error) {
        console.error('Error fetching total recommendations', error);
      }
    },
    setUserID: (userID) => set({ userID }),
    addRecommendation: (recommendation) =>
      set((state) => ({
        recommendations: state.recommendations
          ? [...state.recommendations, recommendation]
          : [recommendation],
        totalRecommendations: state.totalRecommendations + 1,
      })),
    editRecommendation: (id, updatedRecommendation) =>
      set((state) => {
        const recommendations = state.recommendations
          ? state.recommendations.map((rec) =>
              rec.id === id ? { ...rec, ...updatedRecommendation } : rec,
            )
          : [];
        return { recommendations };
      }),
    deleteRecommendation: (id) =>
      set((state) => {
        const recommendations = state.recommendations
          ? state.recommendations.filter((rec) => rec.id !== id)
          : [];
        return { recommendations, totalRecommendations: state.totalRecommendations - 1 };
      }),
    likeRecommendation: (userID, recommendationID) =>
      set((state) => {
        const recommendation = state.recommendations
          ? state.recommendations.find((rec) => rec.id === recommendationID)
          : null;
        if (recommendation && !recommendation.likes.some((like) => like.userID === userID)) {
          recommendation.likes.push({ userID, recommendationID });
        }
        return { recommendations: state.recommendations ? [...state.recommendations] : [] };
      }),
    unlikeRecommendation: (userID, recommendationID) =>
      set((state) => {
        const recommendation = state.recommendations
          ? state.recommendations.find((rec) => rec.id === recommendationID)
          : null;
        if (recommendation) {
          recommendation.likes = recommendation.likes.filter((like) => like.userID !== userID);
        }
        return { recommendations: state.recommendations ? [...state.recommendations] : [] };
      }),
    fetchRecommendations: async () => {
      set({ feedStatus: { loading: true, error: null } }); // Start loading
      try {
        const supabase = await createClient();
        const response = await supabase.from('recommendations').select('*');
        set({
          recommendations: response.data as Recommendation[],
          feedStatus: { loading: false, error: null },
        });
      } catch (error) {
        set({ feedStatus: { loading: false, error: (error as Error).message } });
      }
    },
  }));
};
