import { goto } from "$app/navigation";
import { PUBLIC_API_BASE_URL } from "$env/static/public";

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
	const headers = {
		"Content-Type": "application/json",
		...options.headers,
	};

	const response = await fetch(`${PUBLIC_API_BASE_URL}${endpoint}`, {
		...options,
		headers,
		credentials: "include",
	});

	if (response.status === 401) {
		goto("/login");
		throw new Error("Unauthorized");
	}

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "An error occurred");
	}

	return response.json();
}

export const api = {
	get: (endpoint: string) => fetchWithAuth(endpoint),
	post: (endpoint: string, data: any) =>
		fetchWithAuth(endpoint, { method: "POST", body: JSON.stringify(data) }),
	put: (endpoint: string, data: any) =>
		fetchWithAuth(endpoint, { method: "PUT", body: JSON.stringify(data) }),
	delete: (endpoint: string) => fetchWithAuth(endpoint, { method: "DELETE" }),
};
