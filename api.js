const commentsURL = 'https://wedev-api.sky.pro/api/v2/sivozhelezov/comments';
const loginURL = 'https://wedev-api.sky.pro/api/user/login';
// const likeURL = 'https://wedev-api.sky.pro/api/v2/sivozhelezov/comments/:id/toggle-like'

import { loginInputElement, passwordInputElement, renderComments } from "./renderHTML.js";

//Функция получения данных из API до авторизации
export function getAPIData() {
    return fetch(commentsURL,
        {
            method: 'GET',
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 500) {
                throw new Error(500);
            }
        })
}

//Функция входа пользователя
export function transferAPILogin() {
    return fetch(loginURL,
        {
            method: 'POST',
            body: JSON.stringify({
                login: loginInputElement.value,
                password: passwordInputElement.value
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error(400);
            }
            if (response.status === 500) {
                throw new Error(500);
            }
        })
}

//Функция отправки комментария в API
export function transferAPIData({ commentInputElement, token, sanitizeHTML }) {
    return fetch(commentsURL,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                text: sanitizeHTML(commentInputElement.value)
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response;
            }
            if (response.status === 400) {
                throw new Error(400);
            }
            if (response.status === 500) {
                throw new Error(500);
            }
        })
}

//Функция установки лайка
export function likeAPI({ likeID, token }) {
    return fetch(`https://wedev-api.sky.pro/api/v2/sivozhelezov/comments/${likeID}/toggle-like`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 201) {
                return response;
            }
            if (response.status === 400) {
                throw new Error(400);
            }
            if (response.status === 500) {
                throw new Error(500);
            }
        })
}

//Функция получения данных из API после авторизации
export function getAuthorizedAPIData({ token }) {
    return fetch(commentsURL,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 500) {
                throw new Error(500);
            }
        })
}


// export function loginAPI() {
//     return fetch(loginURL,
//         {
//             method: 'POST',
//             body: JSON.stringify({
//                 login: "glebka",
//                 password: "123456"
//             })
//         })
//         .then((response) => {
//             if (response.status === 201) {
//                 return response;
//             }
//             if (response.status === 401) {
//                 throw new Error(401);
//             }
//             if (response.status === 500) {
//                 throw new Error(500);
//             }
//         })

// }