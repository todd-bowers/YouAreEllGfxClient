import MessageService from "./message-service.js";

let userId = "";
const messageService = new MessageService(userId);

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = 'Welcome ${userID}!';
    messageService.getAllMessages()
        .then(successCallback, errorCallback);

    function successCallback(response) {
        //should this be called populateThreads?
        populateMessages(response);
    }

    function errorCallback(response) {
        console.log(response);
    }
});

//should this be called populateThread?
function populateMessages(messages) {
    messages.forEach(message => {
        addMessageToThread(message);
    })
}

function createFormListener() {
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        event.preventDefault();

        const data = {
            fromid: userId,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            addMessageToThread(response);
        }

        function errorCallback(response) {
            console.log(response);
        }
    }
};

function addMessageToThread(message) {
    const messageListItem = document.createElement("LI");
    const userIDHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIDContent = document.createTextNode(message.fromid);
    userIDHeading.appendChild(userIDContent);
    messageParagraph.appendChild(messageContent);
    messageListItem
        .appendChild(userIDHeading)
        .appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}