const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('nav-open'));


const races = [
    {
        name: "British Grand Prix",
        circuit: "Silverstone Circuit",
        start: "2026-07-03",
        end: "2026-07-05"
    },
    {
        name: "Belgian Grand Prix",
        circuit: "Spa-Francorchamps",
        start: "2026-07-24",
        end: "2026-07-26"
    },
    {
        name: "Hungarian Grand Prix",
        circuit: "Hungaroring",
        start: "2026-07-31",
        end: "2026-08-02"
    },
    {
        name: "Dutch Grand Prix",
        circuit: "Zandvoort",
        start: "2026-08-28",
        end: "2026-08-30"
    },
    {
        name: "Italian Grand Prix",
        circuit: "Monza",
        start: "2026-09-04",
        end: "2026-09-06"
    }
];

const calendarGrid = document.getElementById("calendarGrid");
const today = new Date();
today.setHours(0, 0, 0, 0);

function getStatus(race, index) {
    const start = new Date(race.start);
    const end = new Date(race.end);

    if (today > end) return "Completed";
    if (today >= start && today <= end) return "Race Weekend";

    const nextRace = races.find(r => new Date(r.end) >= today);
    if (nextRace && race.name === nextRace.name) return "Next Race";

    return "Upcoming";
}

races.forEach((race, index) => {
    const status = getStatus(race, index);
    const date = new Date(race.end).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const card = document.createElement("article");
    card.className = `race-card ${status.toLowerCase().replaceAll(" ", "-")}`;

    card.innerHTML = `
    <span class="tag">${status}</span>
    <h3>${race.name}</h3>
    <p>${race.circuit}</p>
    <div class="race-date">${date}</div>
  `;

    calendarGrid.appendChild(card);
});