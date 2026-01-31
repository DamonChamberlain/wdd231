document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const menuBtn = document.getElementById("menu-toggle");
const navList = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    navList.classList.toggle("open");
    menuBtn.classList.toggle("active");
});

const apiKey = 'b028e41796ca0ceca155aebc8f660285'; 
const lat = '46.87'; // Approximate Latitude for Montana-like location
const lon = '-113.99'; // Approximate Longitude for Montana-like location
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const temp = document.getElementById('current-temp');
    const desc = document.getElementById('current-desc');
    const icon = document.getElementById('weather-icon');
    
    temp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    desc.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = '';
    
    const filteredList = data.list.filter(reading => reading.dt_txt.includes('12:00:00')).slice(0, 3);
    
    filteredList.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">
            <p>${temp}&deg;F</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

const membersUrl = 'data/members.json';
const spotlightsContainer = document.getElementById('spotlight-container');

async function fetchMembers() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displaySpotlights(members) {
    const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    spotlightsContainer.innerHTML = '';
    
    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        let levelText = member.membershipLevel === 3 ? "Gold" : "Silver";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p class="membership">Level: ${levelText}</p>
        `;
        spotlightsContainer.appendChild(card);
    });
}

fetchWeather();
fetchForecast();
fetchMembers();