// emit means request is going out socket.emit
// on means receiving socket.on

const socket = io();

let username;
let textarea = document.getElementById('textarea');
let messageArea = document.querySelector('.message__area');
do {
  username = prompt('Please enter your username');
  console.log(username);
} while (!username);

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
  }
});

const sendMessage = (msg) => {
  let message = {
    user: username,
    message: msg.trim(),
  };
  // append msg
  appendMessage(message, 'outgoing');

  // send to server

  socket.emit('message', message);
};

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);

  textarea.value = '';
};

// receive message

socket.on('message', (message) => {
  console.log(message);
  appendMessage(message, 'incoming');
});
