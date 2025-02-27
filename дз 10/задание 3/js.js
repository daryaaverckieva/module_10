//задание 1

const chat = document.querySelector('.chat');
const input = document.querySelector('.inp');
const button = document.querySelector('.btn');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');


socket.onopen = function(event) {
    console.log("Соединение установлено");
};

socket.onerror = function(error) {
    console.log("Ошибка WebSocket: " + error.message);
};

socket.onclose = function(event) {
    console.log("Соединение закрыто");
};


socket.onmessage = function(event) {
    console.log("Сообщение от сервера получено:", event.data);
    const serverMessage = document.createElement('div');
    serverMessage.textContent = event.data;
    serverMessage.classList.add('message-server'); 
    chat.appendChild(serverMessage);
    console.log("Сообщение сервера добавлено в DOM:", serverMessage);
    chat.scrollTop = chat.scrollHeight;
};


button.addEventListener('click', function() {
    console.log("Кнопка нажата");
    const message = input.value;
    if (message) {
        console.log("Сообщение отправлено: " + message);
        const userMessage = document.createElement('div');
        userMessage.textContent = message;
        userMessage.classList.add('message-sender'); 
        chat.appendChild(userMessage);
        console.log("Сообщение отправителя добавлено в DOM:", userMessage);
        socket.send(message); 
        input.value = ''; 
        chat.scrollTop = chat.scrollHeight; 
    }
});

