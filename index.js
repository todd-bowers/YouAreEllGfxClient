import MessageService from "./message-service.js";

let userId = "";
const messageService = new MessageService();

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = 'Welcome ${userID}!';
    messageService.getAllMessages();
});