export class UserAuthError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}