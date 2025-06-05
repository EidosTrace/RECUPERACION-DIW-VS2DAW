const betsContainer = document.getElementById('betsContainer');
const addBetForm = document.getElementById('addBetForm');

let bets = [
    {
        id: 1,
        betSport: "football",
        betMultiplier: 1.10,
        betDate: "2025-01-01",
        betStatus: "abierta",
        team1: "Team A",
        team2: "Team B"
    },
    {
        id: 2,
        betSport: "basketball",
        betMultiplier: 1.15,
        betDate: "2025-01-02",
        betStatus: "cerrada",
        team1: "Team C",
        team2: "Team D"
    },
    {
        id: 3,
        betSport: "tennis",
        betMultiplier: 1.20,
        betDate: "2025-01-03",
        betStatus: "abierta",
        team1: "Player 1",
        team2: "Player 2"
    }
];

function buildCard(bet) {
    let joinButton = '';
    if (bet.betStatus === 'abierta') {
        joinButton = `<button class="card__join-button" data-id="${bet.id}">Unirse</button>`;
    }
    return `
    <card class="tarjeta">
        <h4>${bet.betSport}</h4>
        <div class="imagenes">
            <img src="../img/logos/${bet.team1.toLowerCase().replace(/\s/g, '')}.webp" alt="${bet.team1}" />
            <img src="../img/logos/${bet.team2.toLowerCase().replace(/\s/g, '')}.webp" alt="${bet.team2}" />
        </div>
        <div class="puntuacion">
            <h3>${bet.betMultiplier.toFixed(2)}</h3>
            <p>${bet.betStatus}</p>
            <h3>${bet.betDate}</h3>
        </div>
        ${joinButton}
    </card>
    `;
}

function renderBets() {
    if (!betsContainer) {
        console.error('betsContainer element not found');
        return;
    }
    betsContainer.innerHTML = bets.map(buildCard).join('');
    console.log('Rendered bets with join buttons where applicable');
}

if (addBetForm) {
    addBetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addBetForm);
        const newBet = {
            id: bets.length + 1,
            betSport: formData.get('betSport'),
            betMultiplier: parseFloat(formData.get('betMultiplier')),
            betDate: formData.get('betDate'),
            betStatus: formData.get('betStatus'),
            team1: formData.get('team1'),
            team2: formData.get('team2')
        };
        if (newBet.betDate == null ||newBet.betMultiplier == null ||newBet.betSport == null || newBet.betStatus==null || newBet.team1==null || newBet.team2==null){
            console.log("Es necesario rellenar el campo.")
        } else {
            bets.push(newBet);
        }
        renderBets();
        addBetForm.reset();
    });
}

renderBets();

if (betsContainer) {
    betsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__join-button')) {
            const betId = e.target.getAttribute('data-id');
            window.location.href = `/pages/joinBet.html?id=${betId}`;
        }
    });
}
