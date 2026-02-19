const form = document.querySelector('#join-form');
const welcomeMsg = document.querySelector('#welcome-message');
const savedName = localStorage.getItem('park_scout_user');
if (savedName) {
    welcomeMsg.textContent = `welcome back, ${savedName}! ready for a new trip?`;
}
form.addEventListener('submit', () => {
    const name = document.querySelector('#first-name').value;
    localStorage.setItem('park_scout_user', name);
});