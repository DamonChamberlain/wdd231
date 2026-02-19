export async function loadParks() {
    const grid = document.querySelector('#park-grid');
    const modal = document.querySelector('#park-modal');
    try {
        const response = await fetch('parks.json');
        if (!response.ok) throw new Error('fetch failed');
        const parks = await response.json();
        grid.innerHTML = '';
        parks.forEach(park => {
            const card = document.createElement('div');
            card.className = 'park-card';
            card.innerHTML = `
                <img src="${park.image}" alt="${park.name}" loading="lazy">
                <div class="park-card-content">
                    <h3>${park.name}</h3>
                    <p><strong>location:</strong> ${park.state}</p>
                    <p><strong>type:</strong> ${park.type}</p>
                    <button class="view-details">details</button>
                </div>
            `;
            card.querySelector('.view-details').addEventListener('click', () => {
                const content = modal.querySelector('.modal-content');
                content.innerHTML = `
                    <h2>${park.name}</h2>
                    <p>${park.description}</p>
                    <button id="close-modal">close</button>
                `;
                modal.showModal();
                document.querySelector('#close-modal').addEventListener('click', () => modal.close());
            });
            grid.appendChild(card);
        });
    } catch (err) {
        grid.innerHTML = '<p>unable to load park data.</p>';
    }
}