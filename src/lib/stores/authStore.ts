import { writable } from "svelte/store";

export interface User {
	email: string;
	name?: string;
}

interface AuthState {
	user: User | null;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
	});

	return {
		subscribe,
		setUser: (user: User) => update((state) => ({ ...state, user, isAuthenticated: true })),
		logout: () => set({ user: null }),
	};
}

export const authStore = createAuthStore();
