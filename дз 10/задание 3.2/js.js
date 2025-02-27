
const chat = document.querySelector('.chat');
const input = document.querySelector('.inp');
const button = document.querySelector('.btn');
const buttonGeo = document.querySelector('.btn-geo'); 

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
   
};


button.addEventListener('click', function() {
    const message = input.value;
    if (message) {
        const userMessage = document.createElement('div');
        userMessage.textContent = message;
        userMessage.classList.add('message-sender');
        chat.appendChild(userMessage);
        socket.send(message); 
        input.value = '';
        chat.scrollTop = chat.scrollHeight;
    }
});

buttonGeo.addEventListener('click', function() {
    if (!navigator.geolocation) {
        alert("Гео-локация не поддерживается вашим браузером");
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude; 
                const longitude = position.coords.longitude; 
                const geoUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`; // Ссылка на карту


                const geoMessage = document.createElement('div');
                geoMessage.innerHTML = `<a href="${geoUrl}" target="_blank">Моя гео-локация</a>`;
                geoMessage.classList.add('message-sender'); 
                chat.appendChild(geoMessage);

                chat.scrollTop = chat.scrollHeight; 
            },
            (error) => {
                alert("Не удалось получить вашу гео-локацию: " + error.message);
            }
        );
    }
});