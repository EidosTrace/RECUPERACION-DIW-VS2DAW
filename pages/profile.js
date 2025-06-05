// Simple script to display user balance, notifications, and bet history from localStorage

document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('user-balance');
    const notificationsElement = document.getElementById('user-notifications');
    const historyElement = document.getElementById('bet-history');

    // cargar usuarios de localStorage (asumo que el usuario está logeado y guardado en memoria)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.length > 0 ? users[0].user : null;

    if (currentUser) {
        if (balanceElement) {
            balanceElement.textContent = `Saldo actual: ${currentUser.balance.toFixed(2)} ${currentUser.currency}`;
        }
        if (notificationsElement) {
            notificationsElement.textContent = 'No hay notificaciones nuevas.'; // Placeholder
        }
        if (historyElement) {
            if (currentUser.bets && currentUser.bets.length > 0) {
                historyElement.innerHTML = currentUser.bets.map(bet => `
                    <li>${bet.team1} vs ${bet.team2} - ${bet.bet_status} - ${bet.bet_date}</li>
                `).join('');
            } else {
                historyElement.textContent = 'No hay historial de apuestas.';
            }
        }
    } else {
        if (balanceElement) balanceElement.textContent = 'Usuario no identificado.';
        if (notificationsElement) notificationsElement.textContent = '';
        if (historyElement) historyElement.textContent = '';
    }
});
