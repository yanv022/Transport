import { API_URL } from '../constants';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function authFetch<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: unknown
): Promise<T> {
    const session = localStorage.getItem('authSession');
    const token = session ? JSON.parse(session).token : null;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }


    const config: RequestInit = {
        method,
        headers,
    };

    if (body !== undefined) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
        let message = 'Erreur serveur';
        try {
            const error = await response.json();
            message = error.message || message;
        } catch {}
        throw new Error(message);
    }

    // DELETE sans body
    if (response.status === 204) {
        return null as T;
    }

    return response.json();
}
