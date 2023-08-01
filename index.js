"use strict";

import { getAPIData, getAuthorizedAPIData, likeAPI } from "./api.js";
import { renderLogin } from "./renderHTML.js";
import { getDate } from "./getDate.js";
import { format } from "date-fns";

export let userComments = [];
export let isLoading = 'firstLoad';

//Функция получения данных из API при загрузке страницы
function getData() {
    renderLogin({ isLoading, userComments });
    getAPIData()
        .then((responseData) => {
            userComments = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            })
        })
        .then(() => {
            isLoading = 'render';
            renderLogin({ isLoading, userComments });
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

//Функция получения данных из API после авторизации
export function getAuthorizedData({ renderComments, isLoading, token }) {
    renderComments({ isLoading, userComments });
    getAuthorizedAPIData({token})
        .then((responseData) => {
            userComments = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: comment.isLiked
                };
            })
        })
        .then(() => {
            isLoading = 'render';
            renderComments({ isLoading, userComments });
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

//Функция получения лайков
export function getLikes({ renderComments, isLoading, likeID, token }) {
    likeAPI({ likeID, token })
        .then((response) => {
            return response;
        })
        .then(() => {
            getAuthorizedAPIData({token, renderComments})
                .then((responseData) => {
                    userComments = responseData.comments.map((comment) => {
                        return {
                            id: comment.id,
                            name: comment.author.name,
                            date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
                            text: comment.text,
                            likes: comment.likes,
                            isLiked: comment.isLiked
                        };
                    })
                })
                .then(() => {
                    isLoading = 'likeСhange';
                    renderComments({ isLoading, userComments });
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
getData();
