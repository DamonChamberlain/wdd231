// Footer Information
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-toggle");
const navList = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    navList.classList.toggle("open");
    menuBtn.classList.toggle("active");
});

// Directory Data Logic
const container = document.getElementById("member-container");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function fetchMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        const section = document.createElement("section");
        section.classList.add("member-card");
        
        section.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="membership">Level: ${getMembershipLevel(member.membershipLevel)}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        container.appendChild(section);
    });
}

function getMembershipLevel(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

// View Toggles
gridBtn.addEventListener("click", () => {
    container.classList.add("grid-mode");
    container.classList.remove("list-mode");
    gridBtn.classList.add("active-btn");
    listBtn.classList.remove("active-btn");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-mode");
    container.classList.remove("grid-mode");
    listBtn.classList.add("active-btn");
    gridBtn.classList.remove("active-btn");
});

fetchMembers();