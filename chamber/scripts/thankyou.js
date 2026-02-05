
const urlParams = new URLSearchParams(window.location.search);
const resultContainer = document.getElementById('results');
const fnameDisplay = document.getElementById('display-fname');


if (fnameDisplay && urlParams.has('first_name')) {
    fnameDisplay.textContent = urlParams.get('first_name');
}


if (resultContainer) {
    urlParams.forEach((value, key) => {
        const label = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        const p = document.createElement('p');
        p.innerHTML = `<strong>${label}:</strong> ${value}`;
        resultContainer.appendChild(p);
    });
}


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