"use strict";

import { getAPIData, transferAPIData } from "./api.js";
import { sanitizeHTML } from "./sanitizeHTML.js";
import { renderComments } from "./renderComments.js";
import { getDate } from "./getDate.js";


// Код писать здесь
let nameInputElement = document.getElementById('name-input');
export let commentInputElement = document.getElementById('comment-input');
let buttonElement = document.getElementById('add-form-button');

let userComments = [];
let isLoading = 'firstLoad';

//Функция получения данных из API при загрузке страницы
function getData() {
    renderComments({ isLoading, userComments, commentInputElement });
    getAPIData()
        .then((responseData) => {
            userComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: getDate(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            })
        })
        .then(() => {
            isLoading = 'render';
            renderComments({ isLoading, userComments, commentInputElement });
            nameInputElement = document.getElementById('name-input');
            commentInputElement = document.getElementById('comment-input');
            buttonElement = document.getElementById('add-form-button');

            // Выключение кнопки
            buttonElement.classList.add("inactive-button");
            buttonElement.disabled = true;

            //Проверка полей ввода на наличие введенных данных
            nameInputElement.addEventListener('input', activeButton);
            commentInputElement.addEventListener('input', activeButton);

            // Добавление комментария кнопкой "Написать"
            buttonElement.addEventListener("click", () => {
                addComment();
            })

            //Добавление комментария клавишей Enter
            nameInputElement.addEventListener("keyup", addCommentEnter);
            commentInputElement.addEventListener("keyup", addCommentEnter);

            nameInputElement.value = '';
            commentInputElement.value = '';
            // replyToComment({ userComments, commentInputElement });

        })
        .catch((error) => {
            if (error.message === '500') {
                alert('Кажется, сервер сломался :( Подождите, повторный запрос выполнится автоматически');
                setTimeout(addComment, 2000)
            }
            else {
                alert('Кажется, у Вас пропал интернет :( Попробуйте позже');
            }
            console.log(error.message);
        })
}

//Функция включения кнопки
function activeButton() {
    if (nameInputElement.value && commentInputElement.value) {
        buttonElement.classList.remove("inactive-button");
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add("inactive-button");
        buttonElement.disabled = true;
    }
}

//Функция добавления коментария клавишей Enter
function addCommentEnter(key) {
    if (nameInputElement.value && commentInputElement.value) {
        if (key.code === "Enter") {
            addComment();
        }
    }
}

//Функция добавления объекта комментария в массив
function addComment() {
    if (nameInputElement.value && commentInputElement.value) {
        isLoading = 'addComment';

        transferAPIData({ nameInputElement, commentInputElement, sanitizeHTML })
            .then(() => {
                getData();
                activeButton();
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

getData();
