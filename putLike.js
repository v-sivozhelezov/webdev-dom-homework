//Функция активации лайка
import { renderComments } from "./renderComments.js";


export function putLike({userComments, isLoading,commentInputElement}) {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            isLoading = 'likeСhange';
            const index = likeButtonElement.dataset.index;
            if (userComments[index].isLiked === true) {
                userComments[index].isLiked = false;
                userComments[index].likes--;
            } else {
                userComments[index].isLiked = true;
                userComments[index].likes++;
            }
            renderComments({ isLoading, userComments, commentInputElement });
            event.stopPropagation();
        })
    }
}
