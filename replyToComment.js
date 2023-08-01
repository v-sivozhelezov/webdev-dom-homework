//Функция ответа на комментарий
// import { commentInputElement } from "./main.js";
export function replyToComment({ userComments}) {
    const commentsCardElements = document.querySelectorAll('.comment');
    for (const commentCardElement of commentsCardElements) {
        commentCardElement.addEventListener('click', () => {
            const index = commentCardElement.dataset.index;
            const quote = `/Начало цитаты/${userComments[index].name}:\n ${userComments[index].text}/конец цитаты/ \n`;
            commentInputElement.value = quote.replace("<div class='quote'>", '').replace('</div>', '');
        })
    }
}
