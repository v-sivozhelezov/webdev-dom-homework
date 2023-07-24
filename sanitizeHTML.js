export const sanitizeHTML = (htmlString) => {
    return htmlString
        .replaceAll('>', '&gt')
        .replaceAll('<', '&lt')
        .replaceAll('/Начало цитаты/', "<div class='quote'>")
        .replaceAll('/конец цитаты/', "</div>");

}

