import { UserAuthError } from "./errors/user_auth_error.js";

export class User {
    static #token;

    constructor() {
        User.#token = sessionStorage.getItem('token');
    }

    async auth(mail, password) {
        try {
            const response = await fetch(
                'https://ajax.test-danit.com/api/v2/cards/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: mail,
                        password: password
                    })
                });
            const result = await response.text();
            if (response.status === 200) {
                User.#token = result;
                sessionStorage.setItem('token', result);
                return true;
            } else {
                throw new UserAuthError(result, response.status);
            }
        } catch (error) {
            if (error.code) throw error;
            throw new UserAuthError('Internet connection error', 0);
        }
    }

    get token() {
        return User.#token;
    }

    get isAuth() {
        return User.#token !== null;
    }

    static get token() {
        return User.#token;
    }
}