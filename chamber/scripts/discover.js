const placesUrl = 'data/places.json';
const container = document.getElementById('discover-grid');

async function getPlaces() {
    try {
        const response = await fetch(placesUrl);
        if (response.ok) {
            const data = await response.json();
            displayPlaces(data);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayPlaces(data) {
    container.innerHTML = '';
    data.forEach((place, index) => {
        const card = document.createElement('div');
        card.classList.add('discover-card');
        card.classList.add(`area-${index + 1}`);

        const title = document.createElement('h2');
        title.textContent = place.name;

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = place.image;
        img.alt = place.name;
        img.loading = 'lazy';
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);

        const address = document.createElement('address');
        address.textContent = place.address;

        const desc = document.createElement('p');
        desc.textContent = place.description;

        const button = document.createElement('button');
        button.textContent = 'Learn More';
        button.classList.add('learn-more-btn');

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        container.appendChild(card);
    });
}

getPlaces();

const messageContainer = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        messageContainer.textContent = "Back so soon! Awesome!";
    } else {
        messageContainer.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
    }
}
localStorage.setItem('lastVisit', now);