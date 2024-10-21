export const AuthenticationError = class extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
};
export const AuthorizationError = class extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthorizationError';
    }
};