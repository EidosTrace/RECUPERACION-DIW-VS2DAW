// Simple script to display user rankings and challenges from localStorage or placeholder data

document.addEventListener('DOMContentLoaded', () => {
    const rankingsElement = document.getElementById('user-rankings');
    const challengesElement = document.getElementById('open-challenges');

    // Placeholder data
    const rankings = [
        { username: 'user1', points: 1500 },
        { username: 'user2', points: 1200 },
        { username: 'user3', points: 900 }
    ];

    const challenges = [
        { challenger: 'user2', challengee: 'user1', status: 'Abierto' },
        { challenger: 'user3', challengee: 'user2', status: 'Abierto' }
    ];

    if (rankingsElement) {
        rankingsElement.innerHTML = rankings.map((r, index) => `
            <li>${index + 1}. ${r.username} - ${r.points} puntos</li>
        `).join('');
    }

    if (challengesElement) {
        challengesElement.innerHTML = challenges.map(c => `
            <li>${c.challenger} desafía a ${c.challengee} - Estado: ${c.status}</li>
        `).join('');
    }
});
