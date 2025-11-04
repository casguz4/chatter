import * as signalR from '@microsoft/signalr';
import './css/main.css';

const divMessages: HTMLDivElement = document.querySelector('#divMessages');
const tbMessage: HTMLInputElement = document.querySelector('#tbMessage');
const btnSend: HTMLButtonElement = document.querySelector('#btnSend');
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder().withUrl('/hub').build();

connection.on('messageReceived', ({ username, message }) => {
  const m = document.createElement('div');

  m.innerHTML = `<div class="message-author">${message}<br ><sub style="font-size: .75rem;">by: ${username}</sub></div>`;

  divMessages.appendChild(m);
  divMessages.scrollTop = divMessages.scrollHeight;

  const event = new CustomEvent('signalR', {
    detail: {
      username,
      message,
    },
  });
  dispatchEvent(event);
});

connection.start().catch((err) => document.write(err));

tbMessage.addEventListener('keyup', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    send();
  }
});

btnSend.addEventListener('click', send);

function send() {
  connection
    .send('newMessage', username, tbMessage.value)
    .then(() => (tbMessage.value = ''));
}
