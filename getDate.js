export function getDate(date) {
    let currentDate = new Date(date);
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    currentDate = day + "." + month + "." + String(currentDate.getFullYear()).split('').slice(2).join('') + " " + hour + ":" + minute;

    return currentDate;
}