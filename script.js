let currentLevel = 1;
let correctClicks = 0;
let incorrectClicks = 0;
let reportData = [];
const feedbackElement = document.getElementById('feedback');
const levelTitle = document.getElementById('level-title');
const playButton = document.getElementById('play-button');
const restartButton = document.getElementById('restart-button');
const shapesContainer = document.getElementById('shapes-container');
const reportElement = document.getElementById('report');

const levels = [
    {
        message: 'Nível 1: Clique no círculo azul',
        correctShapeId: 'blue-circle',
        successMessage: 'Parabéns! Você completou o nível 1!',
        backgroundColor: '#ADD8E6' // Light Blue
    },
    {
        message: 'Nível 2: Clique no quadrado verde',
        correctShapeId: 'green-square',
        successMessage: 'Parabéns! Você completou o nível 2!',
        backgroundColor: '#98FB98' // Pale Green
    },
    {
        message: 'Nível 3: Clique na estrela amarela',
        correctShapeId: 'yellow-star',
        successMessage: 'Parabéns! Você completou o nível 3!',
        backgroundColor: '#FFD700' // Gold
    },
    {
        message: 'Nível 4: Clique no triângulo vermelho',
        correctShapeId: 'red-triangle',
        successMessage: 'Parabéns! Você completou o nível 4!',
        backgroundColor: '#FF6347' // Tomato
    },
    {
        message: 'Nível 5: Clique no hexágono roxo',
        correctShapeId: 'purple-hexagon',
        successMessage: 'Parabéns! Você completou o nível 5!',
        backgroundColor: '#DDA0DD' // Plum
    }
];

function updateLevel() {
    const level = levels[currentLevel - 1];
    levelTitle.textContent = level.message;
    document.body.style.backgroundColor = level.backgroundColor; // Muda a cor de fundo
    feedbackElement.textContent = '';
}

function recordReport() {
    const now = new Date();
    const reportEntry = {
        level: currentLevel,
        correctClicks: correctClicks,
        incorrectClicks: incorrectClicks,
        timestamp: now.toLocaleString()
    };
    reportData.push(reportEntry);
}

function showReport() {
    let reportHTML = `<p>Relatório:</p>`;
    reportData.forEach(entry => {
        reportHTML += `
            <p><strong>Nível ${entry.level}:</strong> ${entry.correctClicks} acertos, ${entry.incorrectClicks} erros. Concluído em: ${entry.timestamp}</p>
        `;
    });
    reportElement.innerHTML = reportHTML;
}

function resetGame() {
    currentLevel = 1;
    correctClicks = 0;
    incorrectClicks = 0;
    reportData = [];
    updateLevel();
    showReport();
    feedbackElement.textContent = '';
    restartButton.style.display = 'none';
    shapesContainer.style.display = 'flex';
}

document.querySelectorAll('.shape').forEach(shape => {
    shape.addEventListener('click', function () {
        const level = levels[currentLevel - 1];
        if (this.id === level.correctShapeId) {
            correctClicks++;
            feedbackElement.textContent = level.successMessage;
            recordReport();
            showReport();
            if (currentLevel < levels.length) {
                setTimeout(() => {
                    currentLevel++;
                    updateLevel();
                }, 1000);
            } else {
                feedbackElement.textContent += ' Você terminou o jogo!';
                shapesContainer.style.display = 'none';
                restartButton.style.display = 'block';
            }
        } else {
            incorrectClicks++;
            feedbackElement.textContent = 'Tente novamente!';
        }
    });
});

playButton.addEventListener('click', function() {
    playButton.style.display = 'none';
    levelTitle.style.display = 'block';
    shapesContainer.style.display = 'flex';
    updateLevel();
});

restartButton.addEventListener('click', resetGame);

updateLevel();
