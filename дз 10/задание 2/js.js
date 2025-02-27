const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
console.log(alert(`Размер экрана ${window.screen.width} : ${window.screen.height}`));
});
