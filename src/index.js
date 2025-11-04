"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
require("./css/main.css");
var divMessages = document.querySelector('#divMessages');
var tbMessage = document.querySelector('#tbMessage');
var btnSend = document.querySelector('#btnSend');
var username = new Date().getTime();
var connection = new signalR.HubConnectionBuilder().withUrl('/hub').build();
connection.on('messageReceived', function (_a) {
    var username = _a.username, message = _a.message;
    var m = document.createElement('div');
    m.innerHTML = "<div class=\"message-author\">".concat(message, "<br ><sub style=\"font-size: .75rem;\">by: ").concat(username, "</sub></div>");
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
    var event = new CustomEvent('signalR', {
        detail: {
            username: username,
            message: message,
        },
    });
    dispatchEvent(event);
});
connection.start().catch(function (err) { return document.write(err); });
tbMessage.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        send();
    }
});
btnSend.addEventListener('click', send);
function send() {
    connection
        .send('newMessage', username, tbMessage.value)
        .then(function () { return (tbMessage.value = ''); });
}
