
const timestampElement = document.getElementById('timestamp');
if (timestampElement) {
    timestampElement.value = Date.now();
}


const modalTriggers = document.querySelectorAll('.modal-trigger');
const closeButtons = document.querySelectorAll('.close-modal');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});


const dialogs = document.querySelectorAll('dialog');
dialogs.forEach(dialog => {
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});


const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });
}

const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if(lastModifiedSpan) {
    lastModifiedSpan.innerHTML = `Last Modified: <span>${document.lastModified}</span>`;
}