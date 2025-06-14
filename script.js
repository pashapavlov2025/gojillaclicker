console.log("JavaScript подключён!");

// Инициализация счётчика кликов и улучшений
let clickCounter = 0; // Текущее количество очков
let clickValue = 1; // Количество очков за один клик
let lastMilestone = 0; // Последняя отметка для фейерверков (100, 200 и т.д.)

// Найти элементы
const godzillaElement = document.getElementById('godzilla'); // Изображение Годзиллы
const clickCounterElement = document.getElementById('click-counter'); // Счётчик очков
const upgradeButton = document.getElementById('upgrade-button'); // Кнопка улучшения
const superUpgradeButton = document.getElementById('super-upgrade-button'); // Кнопка супер улучшения
const clickValueElement = document.getElementById('click-value'); // Элемент для отображения значений клика
const fireworksCanvas = document.getElementById('fireworks-canvas'); // Canvas для фейерверков
const ctx = fireworksCanvas.getContext('2d'); // Контекст для рисования

// Настройка размера Canvas
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

// Скрываем Canvas при загрузке страницы
function clearCanvas() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
}

// Звук фейерверков
const fireworkSound = new Audio('firework.wav'); // Убедитесь, что файл firework.mp3 находится в папке проекта

// Проверяем, найден ли элемент с ID "godzilla"
if (godzillaElement) {
    console.log("Элемент Годзиллы найден!");

    // Добавляем обработчик клика
    godzillaElement.addEventListener('click', () => {
        incrementClicks(); // Увеличиваем клики при клике на Годзиллу
    });
} else {
    console.error("Элемент с ID 'godzilla' не найден!");
}

// Добавляем обработчик для нажатия клавиши пробела
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        incrementClicks(); // Увеличиваем клики при нажатии пробела
    }
});

// Обработчик кнопки "Купить улучшение"
if (upgradeButton) {
    upgradeButton.addEventListener('click', () => {
        buyUpgrade();
    });
} else {
    console.error("Кнопка улучшения не найдена!");
}

// Обработчик кнопки "Купить супер улучшение"
if (superUpgradeButton) {
    superUpgradeButton.addEventListener('click', () => {
        buySuperUpgrade();
    });
} else {
    console.error("Кнопка супер улучшения не найдена!");
}

// Функция для увеличения кликов
function incrementClicks() {
    clickCounter += clickValue; // Увеличиваем счётчик на значение клика
    updateCounter();
}

// Функция для автоматического увеличения очков каждую секунду
function autoIncrement() {
    clickCounter++;
    updateCounter();
}

// Функция для обновления счётчика на странице
function updateCounter() {
    if (clickCounterElement) {
        clickCounterElement.textContent = clickCounter; // Обновляем текст счётчика
        console.log(`Очки: ${clickCounter}`); // Отладочное сообщение

        // Показываем кнопку супер улучшения, если очков достаточно
        if (clickCounter >= 500) {
            superUpgradeButton.classList.remove('hidden');
        } else {
            superUpgradeButton.classList.add('hidden');
        }

        // Проверяем достижение кратной 1000 очков отметки
        while (clickCounter >= lastMilestone + 1000) {
            lastMilestone += 1000;
            console.log(`Достигнут новый рубеж: ${lastMilestone}`);
            showFireworks();
        }
    } else {
        console.error("Элемент счётчика (click-counter) не найден!");
    }
}

// Функция для отображения фейерверков через Canvas
function showFireworks() {
    console.log("Фейерверки запускаются!");

    // Воспроизводим звук
    fireworkSound.play();

    const particles = [];
    const colors = ['red', 'yellow', 'blue', 'green', 'white', 'orange', 'purple'];

    // Увеличиваем количество частиц
    for (let i = 0; i < 300; i++) {
        particles.push({
            x: Math.random() * fireworksCanvas.width,
            y: Math.random() * fireworksCanvas.height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            dx: Math.random() * 6 - 3, // Скорость по x
            dy: Math.random() * 6 - 3, // Скорость по y
        });
    }

    let duration = 1500; // Увеличиваем длительность до 1.5 секунд
    let startTime = Date.now();

    function animate() {
        clearCanvas();

        particles.forEach((particle) => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.radius *= 0.96; // Уменьшаем размер

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        if (Date.now() - startTime < duration) {
            requestAnimationFrame(animate);
        } else {
            clearCanvas();
            console.log("Фейерверки завершены.");
        }
    }

    animate();
}

// Функция для покупки улучшения
function buyUpgrade() {
    const upgradeCost = 50; // Стоимость улучшения

    if (clickCounter >= upgradeCost) {
        clickCounter -= upgradeCost; // Списываем очки
        clickValue++; // Увеличиваем значение клика
        updateCounter();
        updateClickValue(); // Обновляем информацию о значении клика

        console.log(`Улучшение куплено! Теперь клик даёт: ${clickValue} очков`);
        alert(`Улучшение куплено! Теперь за каждый клик вы получаете ${clickValue} очков.`);
    } else {
        console.log("Недостаточно очков для покупки улучшения.");
        alert("Недостаточно очков для покупки улучшения!");
    }
}

// Функция для покупки супер улучшения
function buySuperUpgrade() {
    const superUpgradeCost = 400; // Стоимость супер улучшения

    if (clickCounter >= superUpgradeCost) {
        clickCounter -= superUpgradeCost; // Списываем очки
        clickValue += 10; // Увеличиваем значение клика на +10
        updateCounter();
        updateClickValue(); // Обновляем информацию о значении клика

        console.log(`Супер улучшение куплено! Теперь клик даёт: ${clickValue} очков`);
        alert(`Супер улучшение куплено! Теперь за каждый клик вы получаете ${clickValue} очков.`);
    } else {
        console.log("Недостаточно очков для покупки супер улучшения.");
        alert("Недостаточно очков для покупки супер улучшения!");
    }
}

// Функция для обновления значения клика
function updateClickValue() {
    if (clickValueElement) {
        clickValueElement.textContent = clickValue;
        console.log(`Очков за клик обновлено: ${clickValue}`);
    } else {
        console.error("Элемент click-value не найден!");
    }
}

// Запускаем автоматическое увеличение очков каждую секунду
setInterval(autoIncrement, 1000);