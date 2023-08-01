let containerElement = document.getElementById('container');
let commentsElement;
let inputFormElement;
let token;
let userName;
let likeButtonElements;

let commentInputElement;
let buttonElement;
export let loginInputElement;
export let passwordInputElement;


import { putLike } from "./putLike.js";
import { replyToComment } from "./replyToComment.js";
import { transferAPILogin, transferAPIData } from "./api.js";
import { getAuthorizedData, isLoading, userComments } from "./index.js";
import { sanitizeHTML } from "./sanitizeHTML.js";


function clickButtonAuthorization({ authorizationButtonElements, isLoading, userComments }) {
    authorizationButtonElements.addEventListener('click', () => {
        isLoading = 'authorization';
        renderLogin({ isLoading, userComments });
    })
}

function clickButtonLogin({ loginButtonElement }) {

    loginButtonElement.addEventListener('click', (loginInputElement, passwordInputElement) => {
        getLogin({ loginInputElement, passwordInputElement });
    })
}

function clickButtonRegistration({ registrationButtonElement, isLoading, userComments }) {
    registrationButtonElement.addEventListener('click', () => {
        isLoading = 'registration';
        renderLogin({ isLoading, userComments });
    })
}

function clickButtonEnter({ isLoading }) {
    isLoading = 'authorization';
    renderLogin({ isLoading });
}

//Функция включения кнопки
export function activeButton() {
    if (commentInputElement.value) {
        buttonElement.classList.remove("inactive-button");
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add("inactive-button");
        buttonElement.disabled = true;
    }
}

//Функция добавления коментария клавишей Enter
function addCommentEnter(key) {
    if (commentInputElement.value) {
        if (key.code === "Enter") {
            addComment({ isLoading, token });
        }
    }
}

//Функция авторизации
function getLogin({ userComments, isLoading }) {
    transferAPILogin()
        .then((responseData) => {
            userName = responseData.user.name;
            token = responseData.user.token;
            return responseData;
        })
        .then(() => {
            getAuthorizedData({ renderComments, isLoading, token, userComments });
        })
        .catch((error) => {
            if (error.message === '400') {
                alert('Введен неправильный логин или пароль');
            } else if (error.message === '500') {
                alert('Кажется, сервер сломался :( Попробуйте позже');
            }
            else {
                alert('У Вас пропал интернет :( Попробуйте позже');
            }
            console.log(error.message);
        })


}

//Функция добавления объекта комментария в массив
function addComment({ isLoading, token }) {
    if (commentInputElement.value) {
        isLoading = 'addComment';
        transferAPIData({ commentInputElement, sanitizeHTML, token })
            .then(() => {
                getAuthorizedData({ renderComments, isLoading, token, userComments });
            })
            .catch((error) => {
                if (error.message === '400') {
                    alert('Имя и комментарий должны быть длинее 3 символов');
                } else if (error.message === '500') {
                    alert('Кажется, сервер сломался :( Подождите, повторный запрос выполнится автоматически');
                    setTimeout(addComment, 2000)
                }
                else {
                    alert('У Вас пропал интернет :( Попробуйте позже');
                }
                console.log(error.message);
            })
    };
}


//Рендер до входа пользователя
export function renderLogin({ isLoading, userComments }) {
    if (isLoading === 'firstLoad') {
        containerElement.innerHTML = `<h3>Идет загрузка комментариев...</h3>`;
    }

    if (isLoading === 'render') {
        //Рендер комментариев из массива со строкой авторизации
        const userCommentsHtml = userComments.map((userComment) => {

            return ` <li class="comment" data-index="${userComment.id}">
                <div class="comment-header">
                    <div>${userComment.name}</div>
                    <div>${userComment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${userComment.text}
                    </div>                
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${userComment.likes}</span>
                        <button data-index="${userComment.id}" id="like-button" class="like-button ${userComment.isLiked === true ? '-active-like' : ''}"></button>
                    </div>
                </div>
            </li>`;
        })
            .join('');

        containerElement.innerHTML = `<ul id="comments" class="comments">
         ${userCommentsHtml}</ul>  
         <p class="add-form-text-authorization">Чтобы добавить комментарий, <button class="add-form-button-authorization" id="authorization-button">авторизуйтесь</button></p>`;

        const authorizationButtonElements = document.getElementById("authorization-button");

        clickButtonAuthorization({ authorizationButtonElements, isLoading });
    }

    if (isLoading === 'authorization') {
        containerElement.innerHTML = `<div id="add-form" class="add-form  add-form-login">
        <h1>Авторизация</h1>
        <input id='login-input' type="text" class="add-form-login" placeholder="Введите ваш логин" />
        <input id='password-input' type="password" class="add-form-login" placeholder="Введите ваш пароль" />
        <div class="add-form-row add-form-row-login">
            <button id="add-form-button-login" class="add-form-button-login">Войти</button>
            <button id="add-form-button-authorization" class="add-form-button-authorization">Зарегистрироваться</button>
        </div>
    </div>`;
        const loginButtonElement = document.getElementById("add-form-button-login");
        const registrationButtonElement = document.getElementById("add-form-button-authorization");
        loginInputElement = document.getElementById("login-input");
        passwordInputElement = document.getElementById("password-input");

        clickButtonRegistration({ registrationButtonElement, isLoading });
        clickButtonLogin({ loginButtonElement, loginInputElement, passwordInputElement });
    }

    if (isLoading === 'registration') {
        containerElement.innerHTML = `<div id="add-form" class="add-form  add-form-login">
        <h1>Регистрация</h1>
        <input id='name-input' type="text" class="add-form-login" placeholder="Введите ваше имя" />
        <input id='login-input' type="text" class="add-form-login" placeholder="Введите логин" />
        <input id='password-input' type="password" class="add-form-login" placeholder="Введите пароль" />
        <div class="add-form-row add-form-row-login">
            <button id="add-form-button-login" class="add-form-button-login">Зарегистрироваться</button>
            <button id="add-form-button-authorization" class="add-form-button-authorization">Войти</button>
        </div>
    </div>`;
        const enterButtonElement = document.getElementById("add-form-button-authorization");
        enterButtonElement.addEventListener('click', () => {
            clickButtonEnter({ isLoading })
        })
    }
}

//После входа пользователя
export function renderComments({ isLoading }) {

    if (isLoading === 'render') {
        const userCommentsHtml = userComments.map((userComment) => {
            return ` <li class="comment" data-index="${userComment.id}">
                <div class="comment-header">
                    <div>${userComment.name}</div>
                    <div>${userComment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${userComment.text}
                    </div>                
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${userComment.likes}</span>
                        <button data-index="${userComment.id}" id="like-button" class="like-button ${userComment.isLiked === true ? '-active-like' : ''}"></button>
                    </div>
                </div>
            </li>`;
        })
            .join('');

        containerElement.innerHTML = `<ul id="comments" class="comments">
         ${userCommentsHtml}</ul>
         <div id="add-form" class="add-form">  
            <p class="add-name">${userName}</p>
            <textarea id='comment-input' type="textarea" class="add-form-text" placeholder="Введите ваш комментарий"
            rows="4"></textarea>
            <div class="add-form-row">
               <button id="add-form-button" class="add-form-button">Написать</button>
            </div>
         </div>`;
        // const nameInputElement = document.getElementById('name-input');
        // nameInputElement.value = userName
        commentInputElement = document.getElementById('comment-input');
        buttonElement = document.getElementById('add-form-button');
        inputFormElement = document.getElementById('add-form');
        likeButtonElements = document.querySelectorAll('.like-button');
        commentsElement = document.getElementById('comments');

        // Выключение кнопки
        buttonElement.classList.add("inactive-button");
        buttonElement.disabled = true;

        //Проверка полей ввода на наличие введенных данных
        commentInputElement.addEventListener('input', activeButton);

        // Добавление комментария кнопкой "Написать"
        buttonElement.addEventListener("click", () => {
            addComment({ isLoading, token });
        })

        //Добавление комментария клавишей Enter
        commentInputElement.addEventListener("keyup", addCommentEnter);

        putLike({ userComments, commentInputElement, likeButtonElements, token, isLoading });
        // replyToComment({ userComments, commentInputElement });

        commentInputElement.value = '';
        return userCommentsHtml;
    }

    else if (isLoading === 'addComment') {
        inputFormElement.innerHTML = `<h3>Комментарий добавляется...</h3>`;
    }
    else if (isLoading === 'likeСhange') {
        const userCommentsHtml = userComments.map((userComment) => {
            return ` <li class="comment" data-index="${userComment.id}">
                <div class="comment-header">
                    <div>${userComment.name}</div>
                    <div>${userComment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${userComment.text}
                    </div>                
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${userComment.likes}</span>
                        <button data-index="${userComment.id}" id="like-button" class="like-button ${userComment.isLiked === true ? '-active-like' : ''}"></button>
                    </div>
                </div>
            </li>`;

        })
            .join('');
        commentsElement.innerHTML = userCommentsHtml;
        likeButtonElements = document.querySelectorAll('.like-button');
        putLike({ userComments, commentInputElement, likeButtonElements, token, isLoading });
    }
}
