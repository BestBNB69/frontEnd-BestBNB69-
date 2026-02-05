export interface AuthResponse {
    Success: boolean;
    Message?: string;
    error?: string;
    // roles: string[];
    jwt: string;
}