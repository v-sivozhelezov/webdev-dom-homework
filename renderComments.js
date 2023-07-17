let commentsElement = document.getElementById('comments');
const inputFormElement = document.getElementById('add-form')
import { putLike } from "./putLike.js";
import { replyToComment } from "./replyToComment.js";

export function renderComments({ isLoading, userComments, commentInputElement }) {

    if (isLoading === 'firstLoad') {
        inputFormElement.innerHTML = `<h3>Идет загрузка комментариев...</h3>`;
        console.log(isLoading);
    }
    else if (isLoading === 'render') {
        console.log(isLoading);

        //Рендер комментариев из массива
        const userCommentsHtml = userComments.map((userComment, index) => {

            return ` <li class="comment" data-index="${index}">
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
                    <button data-index="${index}" id="like-button" class="like-button ${userComment.isLiked === true ? '-active-like' : ''}"></button>
                </div>
            </div>
        </li>`;
        })
            .join('');
        commentsElement.innerHTML = userCommentsHtml;
        inputFormElement.innerHTML = `<input id='name-input' type="text" class="add-form-name" placeholder="Введите ваше имя" />
                <textarea id='comment-input' type="textarea" class="add-form-text" placeholder="Введите ваш комментарий"
                rows="4"></textarea>
                <div class="add-form-row">
                    <button id="add-form-button" class="add-form-button">Написать</button>
                 </div>`;
    }
    else if (isLoading === 'addComment') {
        inputFormElement.innerHTML = `<h3>Комментарий добавляется...</h3>`;
        console.log(isLoading);

    }
    else if (isLoading === 'likeСhange') {
        console.log(isLoading);

        const userCommentsHtml = userComments.map((userComment, index) => {
            return ` <li class="comment" data-index="${index}">
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
                    <button data-index="${index}" id="like-button" class="like-button ${userComment.isLiked === true ? '-active-like' : ''}"></button>
                </div>
            </div>
        </li>`;

        })
            .join('');
        commentsElement.innerHTML = userCommentsHtml;
    }
    putLike({ userComments, commentInputElement });
    replyToComment({ userComments, commentInputElement });
}
