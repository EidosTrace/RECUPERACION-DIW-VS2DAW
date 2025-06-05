// Manejador de pools en localStorage

document.addEventListener('DOMContentLoaded', () => {
    const createPoolForm = document.getElementById('createPoolForm');
    if (!createPoolForm) return;

    createPoolForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(createPoolForm);
        const poolName = formData.get('poolName').trim();
        const betAmount = parseFloat(formData.get('betAmount'));
        const betType = formData.get('betType');
        const team1 = formData.get('team1').trim();
        const team2 = formData.get('team2').trim();
        const poolPublic = formData.get('poolPublic') === 'on';

        if (!poolName || isNaN(betAmount) || betAmount <= 0 || !betType || !team1 || !team2) {
            alert('Por favor, complete todos los campos obligatorios correctamente.');
            return;
        }

        let pools = JSON.parse(localStorage.getItem('bettingPools')) || [];

        // Crea pool nueva
        const newPool = {
            id: Date.now(),
            poolName,
            betAmount,
            betType,
            team1,
            team2,
            poolPublic,
            creator: null,
            participants: [],
            status: 'open',
            createdAt: new Date().toISOString()
        };

        pools.push(newPool);
        localStorage.setItem('bettingPools', JSON.stringify(pools));

        alert('Pool de apuestas creado correctamente.');
        createPoolForm.reset();
    });
});
