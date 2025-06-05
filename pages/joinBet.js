document.addEventListener('DOMContentLoaded', () => {
    console.log('joinBet.js loaded');
    const urlParams = new URLSearchParams(window.location.search);
    const betId = urlParams.get('id');
    console.log('Bet ID from URL:', betId);
    const betDetailsDiv = document.getElementById('betDetails');
    const joinBetForm = document.getElementById('joinBetForm');
    const betIdInput = document.getElementById('betId');

    if (!betDetailsDiv || !joinBetForm || !betIdInput) {
        console.error('One or more required elements not found in DOM');
        return;
    }

    let bets = JSON.parse(localStorage.getItem('bets')) || [];


    const bet = bets.find(b => b.id === parseInt(betId));
    if (!bet) {
        betDetailsDiv.textContent = 'Apuesta no encontrada.';
        joinBetForm.style.display = 'none';
        return;
    }

    betDetailsDiv.innerHTML = `
        <p><strong>Deporte:</strong> ${bet.betSport}</p>
        <p><strong>Equipos:</strong> ${bet.team1} vs ${bet.team2}</p>
        <p><strong>Multiplicador:</strong> ${bet.betMultiplier.toFixed(2)}</p>
        <p><strong>Fecha:</strong> ${bet.betDate}</p>
        <p><strong>Estado:</strong> ${bet.betStatus}</p>
    `;

    betIdInput.value = bet.id;

    joinBetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            alert('Debe iniciar sesión para unirse a una apuesta.');
            window.location.href = '/pages/login.html';
            return;
        }

        const userIndex = users.findIndex(u => u.user.username === currentUser.username);
        if (userIndex === -1) {
            alert('Usuario no encontrado.');
            return;
        }

        if (!users[userIndex].user.bets) {
            users[userIndex].user.bets = [];
        }
        users[userIndex].user.bets.push(bet);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex].user));

        alert('Se ha unido a la apuesta correctamente.');

        window.location.href = '/pages/profile.html';
    });
});
