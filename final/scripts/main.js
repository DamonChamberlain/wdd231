const menuBtn = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});