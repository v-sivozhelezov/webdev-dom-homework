export function getAPIData() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/sivozhelezov/comments',
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

export function transferAPIData ({commentInputElement, nameInputElement, sanitizeHTML}) {
   return fetch('https://wedev-api.sky.pro/api/v1/sivozhelezov/comments',
    {
        method: 'POST',
        body: JSON.stringify({
            text: sanitizeHTML(commentInputElement.value),
            name: sanitizeHTML(nameInputElement.value),
            forceError: false
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