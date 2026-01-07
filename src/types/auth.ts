// Lo que FastAPI te devuelve al hacer login
export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: UserProfile; // Si tu API devuelve datos del usuario
}

// Datos del usuario (debe coincidir con tu modelo Pydantic)
export interface UserProfile {
    id: number;
    email: string;
    full_name: string;
    role: 'admin' | 'employee'; // Tipado estricto de roles
    is_active: boolean;
}