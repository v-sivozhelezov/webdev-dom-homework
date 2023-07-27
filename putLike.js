//Функция активации лайка
import { likeAPI } from "./api.js";
import { getLikes } from "./index.js";
import { renderComments } from "./renderHTML.js";



export function putLike({ userComments, isLoading, commentInputElement, likeButtonElements, token }) {
    // const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            console.log('like');
            isLoading = 'likeСhange';
            const likeID = likeButtonElement.dataset.index;

            getLikes({ renderComments, isLoading, likeID, token });
            // renderComments({ isLoading, userComments, commentInputElement });
            event.stopPropagation();
        })
    }
}
