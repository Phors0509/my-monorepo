// src/types/User.ts
export interface User {
    id: string;           // User ID from the token
    email: string;        // User email from the token
    role: string;         // User role (e.g., 'admin', 'user')
    username?: string;    // Optional username field
    // Add other custom fields if needed
}
